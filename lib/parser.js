import * as api from './api.js';
import * as utils from './utils.js';
import * as cruds from './cmds/cruds.js';
import { print } from './cmds/print.js';

const handleCommand = (cmd) => async (argv) => {

    let data;
    
    switch (cmd) {
    case 'get':
        data = await cruds.get(argv);
        break;
    case 'put':
        data = await cruds.put(argv);
    // case 'post':
    //     data = await cruds.post(argv);
    // case 'delete':
    //     data = await cruds.del(argv);
    //     break;
    // case 'copy':
    //     // TODO :: add copy function
    //     data = await copy(argv);
    //     break;
    case 'print':
        data = await print(argv);
        break;
    default:
        utils.parseError('Something went wrong parsing command', new Error());
    };

    return data;
};

export const parse = async (argv) => {
    
    const justCommands = (argv) => {
        return argv._.map(command => utils.slugToCamelCase(command))[0];
    };
    
    const command = justCommands(argv);
    
    return await handleCommand(command)(argv);
};

export { parse as default };
