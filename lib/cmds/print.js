import * as utils from '../utils.js';
import { parse } from '../parser.js';

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
    case 'forms':
    case 'field':
    case 'fields':
    case 'test':
        utils.log('debug', `Printing ${argv.resource}...`);
        const res = await parse(withCommand('get')(argv));
        argv.p
            ? prettyResponse(utils.onlyData(res))
            : logResponse(utils.onlyData(res));
        break;
    default:
        utils.parseError(`Invalid resource: ${argv.resource}\n`, new Error());
        
    }

    return 0;
};

export { print as default };
