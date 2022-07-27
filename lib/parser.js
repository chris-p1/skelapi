import * as api from './api.js';
import * as utils from './utils.js';

export const parse = async (argv) => {

    utils.setVerboseLevel(argv.verbose);

    utils.log('debug', `Access Token: ${argv.accessToken}`);
    utils.log('info', 'Checking access token...');
    // if (!await api.checkToken(argv.accessToken)(utils.getEnvUrl(argv.env))) {
    //     utils.parseError('Expired/Invalid access token:', '"' + argv.accessToken + '"');
    // }

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

    const justCommands = (argv) => {
        return argv._.map(command => utils.slugToCamelCase(command));
    };
    
    const justOpts = (argv) => {
        let opts = {};
        Object.keys(argv).forEach(key => {
            if (key !== '_') {
                opts[key] = argv[key];
            }
        });
        return opts;
    };

    const commands = justCommands(argv);
    const opts = justOpts(argv);
   
    for (const command of commands) {
        // debug
        utils.log('debug', `Command: ${command}`);
        handleCommand[command](opts);
    }
};

const handleCommand = {
    get: async (opts) => {
        const logResponse = res => console.log(res);
        const url = utils.getEnvUrl(opts.env);
        const getApi = api.getApi(url, opts.accessToken);
        // debug
        const getTestApi = api.withRetries(api.getTestApi(), { numOfTries: 5 });
        // const getTestApi = api.getTestApi();

        switch (opts.resource) {
        case 'form':
            const getForm = getApi({ endpoint: 'forms', id: opts.resourceId });
            await getForm(logResponse);
            break;
        case 'forms':
            // TODO :: add queries to API 
            const getForms = getApi(
                { endpoint: 'forms',
                  "workspace.id": opts.resourceId
                });
            await getForms(logResponse);
            break;
        case 'field':
            const getField = api.withRetries(getApi(
                { method: 'GET',
                  endpoint: 'forms',
                  id: opts.within,
                  resource: 'fields',
                  resourceId: opts.resourceId
                }), { numOfTries: 5 });
            await getField(logResponse);
            break;
        case 'fields':
            const getFields = getApi(
                { endpoint: 'forms',
                  id: opts.resourceId,
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
    massUpdate: () => {},
    post: () => {},
    del: () => {},
    massDelete: (opts) => {
        switch (opts.resource) {
        case 'forms':
            utils.log('debug', 'you made it!');
        }
    }
};

export { parse as default };
