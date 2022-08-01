import * as path from 'path';
import * as fs from 'node:fs/promises';

export const prettyPrint = (message) => {
    if ((typeof message === 'object' || typeof message === 'array') && message !== null) {
        return JSON.stringify(message, null, 2);
    }
    return message;
};

export const parseError = (msg = '', error) => {
    console.error('\x1b[31mError:\x1b[0m ' + msg, error);
    process.exit(1);
};

let VERBOSE_LEVEL;
let DEFAULT_DATA_DIR = './data';

export const setVerboseLevel = level => {
    VERBOSE_LEVEL = level;
};

export const setDataDir = dir => {
    DEFAULT_DATA_DIR = dir;
};

export const log = (level, message) => {
    switch (level) {
    case 'warn':
        VERBOSE_LEVEL >= 0 && console.log(message);
        break;
    case 'info':
        VERBOSE_LEVEL >= 1 && console.log(message);
        break;
    case 'debug':
        VERBOSE_LEVEL >= 2 && console.log(message);
        break;
    }
};

export const getEnvUrl = env => {
    log('debug','Setting API base URL environment...');
    const stageUrl = 'https://api.stage.zenginehq.dev/v1';
    const prodUrl = 'https://api.zenginehq.com/v1';
    
    switch (env) {
    case 'prod':
        log('debug',`API set to prod URL: ${prodUrl}`);
        return prodUrl;
    case 'stage':
        log('debug',`API set to stage URL: ${stageUrl}`);
        return stageUrl;
    default:
        log('warn','Error: Invalid environment: \"' + env + '\"');
        process.exit(1);
        break;
    }
};

export const slugToCamelCase = str => {
    if (typeof str !== 'string') return str;
    
    return str.split('-').map((word, idx) => {
        if (idx === 0) {
            return word;
        }
        const capital = word.charAt(0).toUpperCase();
        const remainder = word.slice(1);
        return capital + remainder;
    }).join('');
};

export const onlyData = res => res.data;

export const parseRequestBody = async (body) => {
    log('debug', `Parsing request body...`);
    if (typeof body === 'object') return body;

    return isJson(body)
        ? JSON.parse(body)
        : await readJsonFromFile(body);
};

export const isJson = data => {
    let tOrF = false;
    try {
        const dataObj = JSON.parse(data);

        if (dataObj && typeof dataObj === "object") {
            tOrF = true;
        }
    }
    catch (e) { }

    log('debug', `isJson: ${tOrF}`);
    return tOrF;
};

export const readJsonFromFile = async (filepath) => {
    const fullPath = `${DEFAULT_DATA_DIR}/${filepath}`;

    log('debug', `Reading file from ${fullPath}...`);
    let data;
    try {
        const file = await fs.readFile(`${DEFAULT_DATA_DIR}/${filepath}`);
        data = JSON.parse(file);
        // data = file;
    } catch (err) {
        parseError(`Could not read filepath or invalid JSON format for ${filepath}`, err);
    }
    return data;
};

