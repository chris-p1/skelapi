import fetch from 'node-fetch';

import * as utils from './utils.js';

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
    return await retry();
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
    { method,
      endpoint,
      id = null,
      resource = null,
      resourceId = null,
      queries = null,
      body = null
    },
) => async (fn) => {

    const API_URL = `${url}/${endpoint}${id ? `/${id}` : ''}${resource ? `/${resource}` : ''}${resourceId ? `/${resourceId}` : ''}.json?access_token=${accessToken}${queries ? stringifyQueries(queries) : ''}`;
    
    try {
        const response =
              await fetch(API_URL,
                          { method: method,
                            body: body ? JSON.stringify(body) : null,
                            headers: { 'Content-Type': 'application/json' }
                          });
        const data = await response.json();
        return fn(data);
    } catch (err) {
        // console.error(err.message);
        console.error(err);
        throw err;
    }    
};

export const checkToken = token => async (url) => {
    const getWorkspaces = getApi(url, token)({ endpoint: 'workspaces' });
    try {
        const isValid = res =>
              res.totalCount > 0;
        return await getWorkspaces(isValid);
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const stringifyQueries = queries => {
    let queryStr = '';
    for (const query in queries) {
        queryStr += `&${queries[query]}=${query}`;
    }
    return queryStr;
};

