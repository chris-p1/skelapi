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

export const setVerboseLevel = level => {
    VERBOSE_LEVEL = level;
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
    log('debug','Setting API base URL environment');
    switch (env) {
    case 'prod':
        // API_URL = 'https://api.zenginehq.com/v1';
        log('debug',`API URL set to ${env} environment`);
        return 'https://api.zenginehq.com/v1';
    case 'stage':
        // API_URL = 'https://api.stage.zenginehq.dev/v1';
        log('debug',`API URL set to ${env} environment`);
        return 'https://api.stage.zenginehq.dev/v1';
    default:
        log('warn','Error: Invalid environment: \"' + env + '\"');
        process.exit(1);
        break;
    }
};

export const WARN = (msg) => { VERBOSE_LEVEL >= 0 && console.log(msg); };

export const INFO = (msg) => { VERBOSE_LEVEL >= 1 && console.log(msg); };

export const DEBUG = (msg) => { VERBOSE_LEVEL >= 2 && console.log(msg); };

