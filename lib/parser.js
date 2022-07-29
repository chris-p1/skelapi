import * as api from './api.js';
import * as utils from './utils.js';
import * as cruds from './cmds/cruds.js';
import { print } from './cmds/print.js';

export const parse = async (argv) => {
    
    const justCommands = (argv) => {
        return argv._.map(command => utils.slugToCamelCase(command))[0];
    };
    
    const command = justCommands(argv);
    
    // for (const command of commands) {
    return await handleCommand(command)(argv);
    // }
};

const handleCommand = (cmd) => async (argv) => {

    let data;
    
    switch (cmd) {
    case 'get':
        data = await cruds.get(argv);
        break;
    case 'print':
        data = await print(argv);
        break;
    default:
        utils.parseError('Something went wrong parsing command', new Error());
    };

    return data;
    // put: async (argv) => {
//         const body = JSON.parse(unescapeInlineBody(argv.body));
//         const logResponse = res => console.log(utils.prettyPrint(res));
//         utils.log('debug', `opts: ${utils.prettyPrint(argv)}`);
//         utils.log('debug', `body: ${utils.prettyPrint(body)}`);
//         // console.log(JSON.parse(body));
//         const url = utils.getEnvUrl(argv.env);
//         const getApi = api.getApi(url, argv.accessToken);
        
//         switch (argv.resource) {
//         // case 'form':
//         //     const getForm = getApi({ endpoint: 'forms', id: opts.resourceId });
//         //     await getForm(logResponse);
//         //     break;
//         // case 'forms':
//         //     // TODO :: add queries to API 
//         //     const getForms = getApi(
//         //         { endpoint: 'forms',
//         //           "workspace.id": opts.resourceId
//         //         });
//         //     await getForms(logResponse);
//         //     break;
//         case 'field':
//             const getField = api.withRetries(getApi(
//                 { method: 'PUT',
//                   endpoint: 'forms',
//                   id: argv.within,
//                   resource: 'fields',
//                   resourceId: argv.resourceId,
//                   body: body
//                 }), { numOfTries: 5 });
//             await getField(logResponse);
//             break;
//         // case 'fields':
//         //     const getFields = getApi(
//         //         { endpoint: 'forms',
//         //           id: opts.resourceId,
//         //           resource: 'fields'
//         //         });
//         //     await getFields(logResponse);
//         //     break;
//         case 'test':
//             // debug
//             console.log(getTestApi.name);
//             await getTestApi(logResponse,
//                              { test1: "hey!",
//                                test2: "TED!",
//                                test3: "ALEX!"
//                              });
//             getTest();
//             break;
//         }

//     },
//     del: () => {},
//     post: () => {},
    
//     print: async (argv) => {
//         await print(argv);
//     },
    
//     massDelete: (argv) => {
//         switch (argv.resource) {
//         case 'forms':
//             utils.log('debug', 'you made it!');
//         }
//     },
    
//     massUpdate: () => {},

};

const unescapeInlineBody = (body) => {
    return body.replace(/\\"/g, '"');
};

export { parse as default };
