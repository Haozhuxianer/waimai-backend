var expressWs = require('express-ws');
class WSRouter {
    constructor(app, server){
        this.server = server;
        this.app = app;
        this.exec();
    }

    exec() {
        expressWs(this.app, this.server);
        this.app.ws('/', function(ws, req){
            // ws.on('message', function(msg){
            //     console.log(msg);
            //     ws.send('hello client!');
            // })
            console.log('ws exec')
        })
    }
}

module.exports = WSRouter;