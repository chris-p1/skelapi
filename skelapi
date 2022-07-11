#!/usr/bin/env node

require('dotenv').config();
const argv = require('yargs/yargs')(process.argv.slice(2))
      .usage('Usage: $0 <command> [options]')
      .command('get', 'run a GET request')
      .example('$0 get fields --for <ID>', 'get all fields for <Form ID>')
      .command('forms', 'run request on forms')
      .example('$0 get forms --for <ID>', 'get all forms for <Workspace ID>')
      .alias('f', 'for')
      .nargs('f', 1)
      .describe('f', 'Takes the relevant <ID> for the query')
      .demandOption(['for'])
      .alias('e', 'env')
      .nargs('e', 1)
      .describe('e', 'Environment to run request in.')
      .demandOption(['env'])
      .alias('t', 'token')
      .describe('token', 'Developer access token.')
      .nargs('t', 1)
      .help('h')
      .alias('h', 'help')
//      .epilog('hi')
      .argv;

const zApi = require('./lib/api');
const utils = require('./lib/utils');

const ACCESS_TOKEN = argv.token || process.env.ACCESS_TOKEN;
let API_URL = '';

if (argv.version) {
    console.log(process.version);
    process.exit(0);
}
    
switch (argv.env) {
case 'prod':
    API_URL = 'https://api.zenginehq.com/v1';
    break;
case 'stage':
    API_URL = 'https://api.stage.zenginehq.dev/v1';
    break;
default:
    console.error('Error: Invalid environment: \"' + argv.env + '\"');
    process.exit(1);
    break;
}

const api = new zApi(
    API_URL,
    ACCESS_TOKEN
);

const reqHandlers = {
    get: async (target, targetId) => {
        switch (target) {
          case 'forms':
            try {
                let forms = await api.getForms(targetId);
                console.log(utils.prettyPrint(forms));
            } catch (e) {
                utils.parseError('Failed to get forms.', e);
            }
            break;
        }
    },
    put: () => {},
    post: () => {},
    del: () => {}
};

(async () => {
    if (!ACCESS_TOKEN || !await api.tokenCheck(ACCESS_TOKEN)) {
        utils.parseError('Invalid access token:', '"' + ACCESS_TOKEN + '"');
    }

    let reqType;
    let target;
    let targetId = argv['for'];
    
    argv._.forEach((command) => {
        
        switch (command) {
        case 'get':
            reqType = 'get';
            break;
        case 'forms':
            target = 'forms';
            break;
        default:
            utils.parseError('Something went wrong', 'no command');
            break;
        }
    })

    reqHandlers[reqType](target, targetId);
 
})();

// testing
// console.log(argv);
// console.log('Env: ' + argv.env);
// console.log('URL: ' + API_URL);
