export const prettyPrint = (message) => {
    if ((typeof message === 'object' || typeof message === 'array') && message !== null) {
        return JSON.stringify(message, null, 2);
    }
    return message;
};

export const parseError = (msg = '', error = '') => {
    console.error('\x1b[31mError:\x1b[0m ' + msg, error);
    process.exit(1);
};

