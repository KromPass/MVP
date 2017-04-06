const _ = require('lodash');
const console = require('better-console')
const yargs = require('yargs').argv;

const endpoints = ['bin', 'crud', 'auth'];

let api = {};
for(let endpoint of endpoints)
    api[endpoint] = require(`./${endpoint}`);

module.exports = api;

const run = async (service, endpoint, args) => {
	console.clear();
	console.warn(`Executing '${service}/${endpoint}' with '${JSON.stringify(args)}'...`);
	try {
		let result = await api[service][endpoint](args);
		console.info('Success:', result);
	}
	catch(error) {
		console.error('Failure:', error);
	}
};

let service = yargs._[0];
let endpoint = yargs._[1];
let args = yargs;
if(service && endpoint && !process.argv[1].includes('jasmine'))
    run(service, endpoint, args).then(() => process.exit(0));