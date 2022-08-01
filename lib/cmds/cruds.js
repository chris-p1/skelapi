import * as api from '../api.js';
import * as utils from '../utils.js';

export const get = async (argv) => {
    const returnData = data => data;
    const prettyResponse = res => console.log(utils.prettyPrint(res));
    const url = utils.getEnvUrl(argv.env);
    const getApi = api.getApi(url, argv.accessToken);
    // debug
    const getTestApi = api.withRetries(api.getTestApi(), { numOfTries: 5 });

    let data;

    switch (argv.resource) {
        
    case 'form':
        const getForm = getApi({ endpoint: 'forms', id: argv.resourceId });
        data = await getForm(returnData);
        break;
    case 'forms':
        const getForms = getApi(
            { endpoint: 'forms',
              queries: { "workspace.id": argv.resourceId }
            });
        data = await getForms(returnData);
        break;
    case 'field':
        const getField = api.withRetries(getApi(
            { method: 'GET',
              endpoint: 'forms',
              id: argv.within,
              resource: 'fields',
              resourceId: argv.resourceId
            }), { numOfTries: 5 });
        data = await getField(returnData);
        break;
    case 'fields':
        const getFields = getApi(
            { endpoint: 'forms',
              id: argv.resourceId,
              resource: 'fields'
            });
        data = await getFields(returnData);
        break;
    case 'test':
        // debug
        // console.log(getTestApi.name);
        data = await getTestApi(returnData,
                         { test1: "hey!",
                           test2: "TED!",
                           test3: "ALEX!"
                         });
        // getTest();
        break;
    }

    return data;
};

export const put = async (argv) => {
    const returnData = data => data;
    const prettyResponse = res => console.log(utils.prettyPrint(res));
    const url = utils.getEnvUrl(argv.env);
    const getApi = api.getApi(url, argv.accessToken);
    const body = await utils.parseRequestBody(argv.body);
    
    let data;
    
    switch (argv.resource) {
    case 'form':
        const putForm = api.withRetries(getApi(
            { method: 'PUT',
              endpoint: 'forms',
              id: opts.resourceId,
              body: argv.body
            }));
        data = await putForm(prettyResponse);
        break;
    case 'field':
        const putField = api.withRetries(getApi(
            { method: 'PUT',
              endpoint: 'forms',
              id: argv.within,
              resource: 'fields',
              resourceId: argv.resourceId,
              body: body
            }), { numOfTries: 5 });
        data = await putField(prettyResponse);
        break;
        // case 'fields':
        //     const getFields = getApi(
        //         { endpoint: 'forms',
        //           id: opts.resourceId,
        //           resource: 'fields'
        //         });
        //     await getFields(logResponse);
        //     break;
    case 'test':
        const testObj = {
            a: 'test',
            watch: 'this is a test object'
        };

        // const body = utils.parseRequestBody(testObj);
        utils.log('debug', `body after parsing: ${utils.prettyPrint(body)}`);
        data = 0;
        break;
    }

    return data;
};

const unescapeInlineBody = (body) => {
    return body.replace(/\\"/g, '"');
};

export const post = (argv) => {};

export const del = (argv) => {};


