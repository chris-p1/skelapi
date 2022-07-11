const request = require('request');

module.exports = class ZnApi {
    _config = {}

    constructor(apiUrl, accessToken, pluginMap = {}) {
        this._config.apiUrl = apiUrl;
        this._config.accessToken = accessToken;
        this._config.pluginMap = pluginMap;
    }

    async getForms(workspaceId) {
        let self = this;
        let pageLimit = 100;
        return await self
            .executeApiCommand(`forms.json?workspace.id=${workspaceId}&limit=${pageLimit}`, 'GET', {})
            .then(response => Promise.resolve(response.data));
    }

    async getFields(formId) {
        let self = this;
        // Default limit is set to 20. We query over 200 to ensure all fields are returned.
        return await self
            .executeApiCommand(`forms/${formId}/fields.json?limit=250`, 'GET', {})
            .then(response => Promise.resolve(response.data));
    }

    executeApiCommand(path, action, body) {
        return new Promise((resolve, reject) => {
            request({
                uri: path,
                baseUrl: this._config.apiUrl,
                method: action,
                qs: {
                    access_token: this._config.accessToken
                },
                body: body,
                json: true
            }, function(error, response, body) {
                if(error) reject(error);
                else {
                    resolve(body);
                }
            });
        });
    }

    async tokenCheck(token) {
        let self = this;
        let res = await self
                .executeApiCommand(`/workspaces?access_token=${token}`, 'GET', {});
        return res.data ? true : false;
    }

};
