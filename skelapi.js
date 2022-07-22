#!/usr/bin/env node

// require('dotenv').config();
import 'dotenv/config';
import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';

// const zApi = require('./lib/api');
import * as api from './src/model/api.js';
import * as utils from './src/lib/utils.js';

const argv = yargs(process.argv.slice(2))
      .usage('Usage: $0 <command> [options]')
      .command('get', 'run a GET request')
      .example('$0 get fields --for <formID>', 'get all fields for <formID>')
      .command('forms', 'run request on forms for a workspace')
      .example('$0 get forms --for <workspaceID>', 'get all fields for <workspaceID>')
      .command('fields', 'run request on fields for a form')
      .example('$0 get fields --for <formID>', 'get all fields for <formID>')
      .command('field', 'run request on field for a form')
      .example('$0 get field --for <formID> --with <fieldID>', 'get all fields for <formID> with <fieldID>')
      .command('form', 'run request on a form')
      .example('$0 get form --for <formID>', 'get all data for <Form ID>')
      .command('test', 'for testing purposes')
      .example('$0 get test --for <ID>', 'Varies by developer\'s needs')
      .alias('f', 'for')
      .nargs('f', 1)
      .describe('f', 'Takes the relevant ID for the endpoint')
      .demandOption(['for'])
      .alias('w', 'with')
      .nargs('w', 1)
      .describe('w', 'Takes the relevant ID for the resource')
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

const ACCESS_TOKEN = argv.token || process.env.ACCESS_TOKEN;
let API_URL = '';

if (argv.version) {
    console.log(process.version);
    process.exit(0);
}

const getEnvUrl = env => {
    switch (env) {
    case 'prod':
        API_URL = 'https://api.zenginehq.com/v1';
        return 'https://api.zenginehq.com/v1';
    case 'stage':
        API_URL = 'https://api.stage.zenginehq.dev/v1';
        return 'https://api.stage.zenginehq.dev/v1';
    default:
        console.error('Error: Invalid environment: \"' + argv.env + '\"');
        process.exit(1);
        break;
    }
}
// const api = new zApi(
//     API_URL,
//     ACCESS_TOKEN
// );

const reqHandlers = {
    get: async (target) => {
        const logResponse = res => console.log(res);
        const url = getEnvUrl(argv.env);
        const getApi = api.getApi(url, ACCESS_TOKEN);
        // debug
        const getTestApi = api.withRetries(api.getTestApi(), { numOfTries: 5 });
        // const getTestApi = api.getTestApi();

        switch (target) {
        case 'form':
            console.log('form' + '!');
            // debug
            console.log(`url: ${url}`);
            const getForm = getApi({ endpoint: 'forms', id: argv.for });
            await getForm(logResponse);
            break;
        case 'forms':
            console.log('forms' + '!');
            // debug
            console.log(`url: ${url}`);
            // TODO :: add queries to API 
            const getForms = getApi({ endpoint: 'forms' });
            await getForms(logResponse);
            break;
        case 'field':
            const getField = api.withRetries(getApi(
                { endpoint: 'forms',
                  id: argv.for,
                  resource: 'fields',
                  resourceId: argv.with
                }), { numOfTries: 5 });
            await getField(logResponse);
            break;
        case 'fields':
            const getFields = getApi(
                { endpoint: 'forms',
                  id: argv.for,
                  resource: 'fields'
                });
            await getFields(logResponse);
            break;
        case 'test':
            // debug
            // console.log(getTestApi.name);
            await getTestApi(logResponse);
            // getTest();
            break;
        }
    },
    put: () => {},
    post: () => {},
    del: () => {}
};

(async () => {
    // if (!ACCESS_TOKEN || !await api.tokenCheck(ACCESS_TOKEN)) {
    //     utils.parseError('Invalid access token:', '"' + ACCESS_TOKEN + '"');
    // }

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
        case 'test':
            // debug
            console.log('Argv processing!');
            target = 'test';
            break;
        case 'fields':
            console.log('argv fields!');
            target = 'fields';
            break;
        case 'field':
            console.log('argv field!');
            target = 'field';
            break;
        default:
            utils.parseError('Something went wrong', 'no command');
            break;
        }
    })

    reqHandlers[reqType](target);
    // debug
    // console.log(JSON.stringify(argv, null, 2));
 
})();

// testing
// console.log(argv);
// console.log('Env: ' + argv.env);
// console.log('URL: ' + API_URL);
