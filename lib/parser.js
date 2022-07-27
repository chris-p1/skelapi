import * as api from './api.js';
import * as utils from './utils.js';

export const parse = async (argv) => {

    utils.setVerboseLevel(argv.verbose);

    utils.log('info', 'Checking access token...');
    if (!await api.checkToken(argv.accessToken)(utils.getEnvUrl(argv.env))) {
        utils.parseError('Invalid access token:', '"' + argv.accessToken + '"');
    }

      // debug
    console.log(`=== Debug ===`);
    
    const printArgv = args => {
        JSON.stringify(args, null, 2);
        console.log(`Argv: ${JSON.stringify(argv, null, 2)}`);
    };
    const printEnv = currEnv => {
        console.log(`process.env: ${JSON.stringify(currEnv, null, 2)}`);
    };
    
    if (argv.p) {
        printArgv(argv);
    }
    // printEnv(processEnv);
  
};

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
            const getForm = getApi({ endpoint: 'forms', id: argv.for });
            await getForm(logResponse);
            break;
        case 'forms':
            // TODO :: add queries to API 
            const getForms = getApi(
                { endpoint: 'forms',
                  "workspace.id": argv.for
                });
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
            await getTestApi(logResponse,
                             { test1: "hey!",
                               test2: "TED!",
                               test3: "ALEX!"
                             });
            // getTest();
            break;
        }
    },
    put: () => {},
    post: () => {},
    del: () => {}
};

export { parse as default };
