'use strict';

let config = {
	name: 'MVP',
	secret: 'mvp', //@hide

	// ssl: {
	// 	cert: './ssl/mvp.com.crt',
	// 	key: './ssl/mvp.com.key',
	// 	ca: './ssl/mvp.com.ca',
	// },

	formats: {
        datetime: 'YYYY-MM-DD hh:mm',
		date: 'YYYY-MM-DD',
		time: 'hh:mm',
	},

    supportedBrowsers: {
        Chrome: '57',
        Safari: '10.0',
        Firefox: '52.0',
    },

	connection: {
		hostname: 'localhost', database: 'mvp', username: 'ec2-user', password: 'pwd123!', //@hide
		engine: 'sqlite', storage: 'app.db', //@hide postgres
	},

	gmail: {
		username: 'baloo.cane.mucca@gmail.com',
		password: '',
		from: '"MVP" <info@mvp.com>',
	},

	aws: {
		accessKeyId: '',
		secretAccessKey: '', //@hide
		region: '',
		bucket: '',
	},

	facebook: {
        clientID: '1317941064967130',
        clientSecret: '8ba443947d8fff9e9927430fe3396d37',
        connectURL: '/api/auth/facebook/oauth',
        callbackURL:'/api/auth/facebook/oauthed',
        profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'locale'],
        scope: ['email', 'user_about_me'],
	},

	google: {
        clientID: '693335922646-83m4bc0c3j5va5kteft6gi4m5tp4brd0.apps.googleusercontent.com',
		clientSecret: 'VKR-McqpfpIPAMZkS9FWmIT4',
		connectURL: '/api/auth/google/oauth',
		callbackURL: '/api/auth/google/oauthed',
		profileFields: ['id', 'displayName', 'email'],
		scope: ['email'],

        serverApiKey: '',
		browserApiKey: ''
	},

	development: {
		host: {
			hostname: 'dev.mvp.com',
			httpPort: 8080,
			// httpsPort: 9090,
		},
		stripe: {
			public: '',
			secret: '', //@hide
		},
	},

	staging: {
		host: {
			hostname: 'stg.mvp.com',
		},
		stripe: {
			public: '',
			secret: '', //@hide
		},
	},

	production: {
		host: {
			hostname: 'www.mvp.com',
		},
		stripe: {
			public: '',
			secret: '', //@hide
		},
	},
};

let env;

if(typeof window === 'undefined') {
	env = process.env.NODE_ENV;
}
else {
	for(let maybe of ['development', 'staging', 'production'])
		if(config[maybe].host.hostname == window.location.hostname)
			env = maybe;
}

env = env || 'development';

let result = Object.assign({}, config, config[env], { env });
result.host.url = `${result.host.httpsPort ? 'https' : 'http'}://${result.host.hostname}`;

if(result.host.httpsPort)
	result.host.url += `:${result.host.httpsPort}`;
else if(result.host.httpPort)
	result.host.url += `:${result.host.httpPort}`;

result.connection.string = `${result.connection.engine}://${result.connection.username}:${result.connection.password}@localhost/${result.connection.database}`; //@hide

delete result.development;
delete result.staging;
delete result.production;

// console.log('env is', env);

module.exports = result;