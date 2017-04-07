process.env.NO_DEPRECATION = 'koa';

const config = require('./config/config.js');
const _ = require('lodash');
const console = require('better-console');
const fs = require('fs');
const http = require('http');
const https = require('https');
const scheduler = require('node-schedule');
const compareVersions = require('compare-versions');

const koa = require('koa');
const cors = require('koa-cors');
const compress = require('koa-compress')
const removeTrailingSlashes = require('koa-remove-trailing-slashes');
const limit = require('koa-better-ratelimit');
const json = require('koa-json');
const body = require('koa-body');
const send = require('koa-send');
const mount = require('koa-mount');
const basicAuth = require('koa-basic-auth');
const sslify = require('koa-sslify');
const userAgent = require('koa-useragent');
const passport = require('koa-passport');
const router = require('koa-router')();

const app = new koa();

app.use(cors());
app.use(compress());
app.use(removeTrailingSlashes());
app.use(limit({ duration: 1000, max: 10 }));
app.use(json({ pretty: true, spaces: 4 }));
app.use(body({ formLimit: '5mb', jsonLimit: '5mb', strict: false, multipart: true }));
app.use(userAgent);
app.use(passport.initialize());

if(config.ssl) {
	app.use(sslify({
		temporary: true,
		port: config.host.httpsPort,
		redirectMethods: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE'],
	}));
}

app.use(async (ctx, next) => {
	try {
    	await next();
  	}
	catch(error) {
		if(error.status == 401) {
			ctx.status = 401;
			ctx.set('WWW-Authenticate', 'Basic');
			ctx.body = 'Auth required.';
		}
		else {
			console.error(error);
	    	ctx.status = 400;
			ctx.body = error.message || error;
		}
	}
});

// app.use(mount('/admin', basicAuth({ name: 'admin', pass: config.secret })));

//social connects
const computeConnectedUser = (accessToken, refreshToken, profile, done) => {
    const data = {
        provider: profile.provider, accessToken,
        id: profile.id, email: profile.emails ? profile.emails[0].value : null,
        firstName: profile.name.givenName, lastName: profile.name.familyName,
        raw: profile._json,
    };
    done(false, data);
};

const auth = require('./api/auth');
const oauthed = async (ctx) => {
	let connected = ctx.state.user;
    if(!connected.email)
        return ctx.redirect(config[connected.provider].connectURL);
    try {
        let token = await auth.connect(connected);
        ctx.redirect(`/user/auth/${token}`);
    }
    catch(error) {
        console.log(error);
        ctx.body = error.message;
    }
};

const Strategies = {
    facebook: require('passport-facebook'),
    google: require('passport-google-oauth').OAuth2Strategy,
};
for(let social of ['facebook', 'google']) {
    const connectURL = config[social].connectURL;
    const callbackURL = config[social].callbackURL;
    const scope = config[social].scope;
    const Strategy = Strategies[social];
    const connectParams = _.pick(config[social], ['clientID', 'clientSecret', 'callbackURL', 'profileFields']);
    const strategy = new Strategy(connectParams, computeConnectedUser);
    passport.use(strategy);

    router.all(connectURL, passport.authenticate(social, { authType: 'rerequest', scope })); //oauth
    router.all(callbackURL, passport.authenticate(social, { failureRedirect: connectURL, session: false }), oauthed); //oauthed
}

const services = ['auth', 'crud'];
for(let service of services) {
    const api = require(`./api/${service}`);
	router.all(`/api/${service}/:endpoint`, async ctx => {
		let args = Object.assign({}, ctx.request.query, ctx.request.body, ctx.params);
		console.info('API', `${service}:${args.endpoint}`, JSON.stringify(args));
		let result = await api[args.endpoint](args);
		console.info('Result', result);
		ctx.body = result;
	});
}

router.all('/api/*', async ctx => {
	ctx.throw('Endpoint not found');
});

let cacheHeaders = (res, path, stats) => {
	res.setHeader('Cache-Control', 'max-age=' + 3600 * 24 * 7);
};

const detectUnsupportedBrowser = async (ctx, next) => {
    const { os, browser, isCurl, isMobile, isTablet } = ctx.userAgent;
    const version = ctx.userAgent.version.match(/(^\d+\.\d+)/i)[1];
    const minVersion = config.supportedBrowsers[browser];
    const allowed = minVersion && compareVersions(version, minVersion) > -1 || isCurl;
    // console.log({ os, browser, version, isCurl, isMobile, isTablet, minVersion, allowed });

    if(allowed)
        return next();
    else
        await send(ctx, 'build/unsupported.html', { root: __dirname, setHeaders: cacheHeaders });
};

router.all('/build*', async ctx => {
	await send(ctx, ctx.path, { root: __dirname, setHeaders: cacheHeaders });
});

router.all(['/superadmin', '/superadmin/*'], detectUnsupportedBrowser, async ctx => {
	await send(ctx, 'build/superadmin/index.html', { root: __dirname, setHeaders: cacheHeaders });
});

router.all(['/admin', '/admin/*'], detectUnsupportedBrowser, async ctx => {
	await send(ctx, 'build/admin/index.html', { root: __dirname, setHeaders: cacheHeaders });
});

router.all(['/user', '/user/*'], detectUnsupportedBrowser, async ctx => {
	await send(ctx, 'build/user/index.html', { root: __dirname, setHeaders: cacheHeaders });
});

router.all('*', detectUnsupportedBrowser, async ctx => {
	await send(ctx, 'build/visitor/index.html', { root: __dirname, setHeaders: cacheHeaders });
});

app.use(router.routes());

http.createServer(app.callback()).listen(config.host.httpPort);

if(config.ssl) {
	let sslOptions = {
		key: fs.readFileSync(config.ssl.key),
		cert: fs.readFileSync(config.ssl.cert),
	};
	if(config.ssl.ca)
		sslOptions.ca = fs.readFileSync(config.ssl.ca);

	https.createServer(sslOptions, app.callback()).listen(config.host.httpsPort);
}

//init jobs
const jobs = require('./api/jobs');
for(let time in jobs)
    scheduler.scheduleJob(time, jobs[time]);