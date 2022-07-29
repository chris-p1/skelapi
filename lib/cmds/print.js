import * as api from '../api.js';
import * as utils from '../utils.js';
import { parse } from '../parser.js';
import * as cruds from './cruds.js';

export const print = async (argv) => {

    const logResponse = res => console.log(res);
    const prettyResponse = res => console.log(utils.prettyPrint(res));

    const withCommand = cmd => argv => {
        const newArgv = {};
        Object.keys(argv)
            .forEach(key => {
                if (key === '_') {
                    newArgv[key] = [ cmd ];
                } else {
                    newArgv[key] = argv[key];
                }
            });
        
        return newArgv;
    };

    switch (argv.resource) {
        
    case 'form':
        utils.log('debug', `Printing form ${argv.resourceId}...`);
        const form = await parse(withCommand('get')(argv));
        argv.p
            ? prettyResponse(utils.onlyData(form))
            : logResponse(utils.onlyData(form));
        break;
        
    case 'forms':
        utils.log('debug', `Printing forms for ${argv.resourceId}...`);
        const forms = await parse(withCommand('get')(argv));
        argv.p
            ? prettyResponse(utils.onlyData(forms))
            : logResponse(utils.onlyData(forms));
        break;
        
    case 'field':
        utils.log('debug', `Printing field ${argv.resourceId}...`);
        const field = await parse(withCommand('get')(argv));
        argv.p
            ? prettyResponse(utils.onlyData(field))
            : logResponse(utils.onlyData(field));
        break;

    case 'fields':
        utils.log('debug', `Printing fields for ${argv.resourceId}...`);
        const fields = await parse(withCommand('get')(argv));
        argv.p
            ? prettyResponse(utils.onlyData(fields))
            : logResponse(utils.onlyData(fields));
        break;
        
    case 'test':
        utils.log('debug', `Printing test API result...`);
        const test = await parse(withCommand('get')(argv));
        argv.p
            ? prettyResponse(utils.onlyData(test))
            : logResponse(utils.onlyData(test));
        break;
    }

    return 0;
};

export { print as default };
