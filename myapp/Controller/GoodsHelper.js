var GoodsModel = require('../model/goods');

class GoodsHelper {
    constructor() {
        this.addGoods = this.addGoods.bind(this);
        this.deleteGoods = this.deleteGoods.bind(this);
    }

    async addGoods(req, res, next) {
        try {
            let json = req.body.data;
            await json.forEach(element => {
                let createData = {
                    id: element.id,
                    imageurl: element.squareimgurl,
                    title: element.mname,
                    subtitle: element.title,
                    price: element.price
                }
                new GoodsModel(createData).save();
                console.log(createData);
            });
            res.send(200);
        } catch(err) {
            console.log(err);
            res.send(-1);
        }
    }

    async deleteGoods(req, res , next) {
        
    }

    async getAllGoods(req, res, next) {
        GoodsModel.find(function(err, goodses) {
            // console.log(goodses);
            res.send(goodses);
        });
    }
}

module.exports = new GoodsHelper();