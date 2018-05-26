var GoodsModel = require('../model/goods');

class GoodsHelper {
    constructor() {
        this.addGoods = this.addGoods.bind(this);
        this.deleteGoods = this.deleteGoods.bind(this);
        this.getAllGoods = this.getAllGoods.bind(this);
    }

    async addGoodes_dev(req, res, next) {
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
                // console.log(createData);
            });
            res.send(200);
        } catch(err) {
            console.log(err);
            res.send(-1);
        }
    }

    async addGoods(req, res, next) {
        try {
            let data = await req.body;
            console.log(data);
            GoodsModel.create(data, function(err, doc){
                console.log('商品添加成功')
                console.log(doc.toJSON());
            });
            res.send({
                status: 200,
                message: '添加成功'
            })
        } catch(err) {
            console.log(err);
            res.send({
                status: -1,
                message: '添加失败'
            })
        }
    }

    async deleteGoods(req, res ,next) {
        try {
            GoodsModel.findOneAndRemove({id: req.params.id}, function(err, doc){
                if (doc){
                    console.log('成功删除：')
                    console.log(doc.toJSON());
                    res.send({
                        status: 200,
                        message: '删除成功'
                    })
                }else {
                    console.log('删除失败');
                    res.send({
                        status: -1
                    });
                }
            });
        } catch(err) {
            console.log(err);
            res.send({
                status: -1,
                message: '删除失败'
            })
        }
    }

    async updateGoods(req, res, next) {
        try{
            let data = req.body;
            GoodsModel.update({id: data.id}, {
                imageurl: data.imageurl,
                title: data.title,
                subtitle: data.subtitle,
                price: data.price
            }, function(err, raw){
                if(raw){
                    console.log('更新成功');
                    res.send({
                        status: 200,
                        message: '更新成功'
                    })
                }else {
                    console.log('更新失败');
                    res.send({
                        status: -1,
                        message: '更新失败'
                    })
                }
            });
        }catch(err){
            console.log('更新失败');
                    res.send({
                        status: -1,
                        message: '更新失败'
                    })
        }
    }

    async getAllGoods(req, res, next) {
        GoodsModel.find(function(err, goodses) {
            // console.log(goodses);
            res.send(goodses);
        });
    }
}

module.exports = new GoodsHelper();