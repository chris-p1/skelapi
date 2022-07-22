import fetch from 'node-fetch';

export const withRetries = (fn, { numOfTries = 10, ms = 400 } = {}) => async (...params) => {
    const retry = async (attempt = 1) => {
        try {
            
            return await fn(...params);
        } catch (err) {
            
            if (attempt >= numOfTries) {
                console.log('Retry maximum reached. Exiting...');
                throw err;
            }
            
            console.log(`Request attempt ${attempt} failed. Retrying...`);
            const delay = ms * attempt;
            
            return new Promise(resolve => setTimeout(() => retry(attempt + 1), delay));
        }
    };
    retry();
};

export const getTestApi = () => async (cb, ...args) => {

    console.log('Sending request...');
    const itPasses = Math.random() < 0.3;
    
    if (itPasses) {
        const queries = args => {
            let arr = [];
            for ( const [k, v] of Object.entries(args)) {
                arr.push(v);
            }
            return arr;
        };
        return cb(queries(...args));
    } else {
        throw new Error ("Epic fail.");
    }
};

export const getApi = (url, accessToken) => (
    { endpoint,
      id = null,
      resource = null,
      resourceId = null
    },
    { ...queries } = {}
) => async (fn) => {
       
    try {
        const response = await fetch(`${url}/${endpoint}${id ? `/${id}` : ''}${resource ? `/${resource}` : ''}${resourceId ? `/${resourceId}` : ''}.json?access_token=${accessToken}`);
        const data = await response.json();
        
        return fn(data);
    } catch (err) {
        console.error(err.message);
        throw err;
    }    
};

