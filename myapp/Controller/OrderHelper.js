var aWss = require('../bin/www')

class OrderHelper {
    constructor() {
        this.transmitOrder = this.transmitOrder.bind(this);
    }

    async transmitOrder(req, res, next) {
        try {
            let data = JSON.stringify(req.body);
            let wss = global.aWss.getWss();
            await wss.clients.forEach((client) => {
                client.send(data);
            });
            res.send(200);
        } catch (error) {
            console.log(error)
            res.send({
                status: -1,
            });
        }
        
    }
}

module.exports = new OrderHelper();
