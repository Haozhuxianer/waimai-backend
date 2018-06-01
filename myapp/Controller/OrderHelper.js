var aWss = require('../bin/www')
var OrderModel = require('../model/Order');

class OrderHelper {
    constructor() {
        this.transmitOrder = this.transmitOrder.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.getNonOrder = this.getNonOrder.bind(this);
    }

    async transmitOrder(req, res, next) {
        try {
            console.log(JSON.stringify(req.body))
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

    async createOrder(req, res, next) {
        try {
            let data = req.body;
            console.log(data);
            let order = {
                id:Date.parse(new Date()),
                status:0,
                addressInfo: data.addressInfo,
                goodsInfo: data.goodsInfo,
            }
            OrderModel.create(order, function(err, doc){
                console.log('订单已生成');
                console.log(doc.toJSON());
            })
            //转发商户端
            let wss = global.aWss.getWss();
            await wss.clients.forEach((client) => {
                client.send(JSON.stringify(order));
            });
            res.send({
                orderid: order.id,
                status: 200,
                message: '订单生成成功'
            })
        } catch(err) {
            console.log(err)
            res.send({
                status: -1,
                message: '订单生成失败'
            })
        }
    }

    async updateOrderStatus(req, res, next) {
        try {
            let data = req.body
            OrderModel.update({id:data.id},{
                status:data.status
            },function(err, raw){
                if(raw){
                    switch(data.status){
                        case 1:
                            //商家已接单
                            console.log('商家已接单')
                            break;
                        case -1:
                            //商家拒绝接单
                            console.log('商家拒绝接单')
                            break;
                        case 2:
                            // 订单已完成
                            console.log('订单已完成')
                            break;
                    }
                    console.log('订单状态更能成功')
                    res.send({
                        status:200,
                        message:'订单状态更能成功'
                    })
                }else{
                    console.log('订单状态更改失败')
                    res.send({
                        status:-1,
                        message: '订单更新失败'
                    })
                }
            })
        }catch(err){
            console.log('订单状态更新失败')
            res.send({
                status:-1,
                message: '订单更新失败'
            })
        }
    }

    async deleteOrder(req, res, next) {
        try {
            OrderModel.findOneAndRemove({id:req.params.id}, function(err, doc){
                if(doc) {
                    console.log('成功删除')
                    console.log(doc.toJSON())
                    res.send({
                        status: 200,
                        message: '删除成功'
                    })
                }else {
                    console.log('删除失败')
                    res.send({
                        status:-1,
                        message: '删除失败，不存在该数据'
                    });
                }
            })
        }catch(err) {
            console.log(err)
            res.send({
                status:-1,
                message: '删除失败'
            });
        }
    }

    async getOrders(req, res, next) {
        try{
            OrderModel.find(function(err, orders){
                res.send(orders)
            })
        }catch(err){
            console.log(err)
            res.send(-1)
        }
    }

    async getNonOrder(req, res, next) {
        try{
            OrderModel.find({status: 0},function(err, orders){
                res.send(orders)
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new OrderHelper();
