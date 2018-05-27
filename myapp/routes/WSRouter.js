var expressWs = require('express-ws');
class WSRouter {
    constructor(app, server){
        this.server = server;
        this.app = app;
        this.aWss = expressWs(this.app, this.server);
    }


    getInstance() {
        return this.aWss;
    }
}

module.exports = WSRouter;