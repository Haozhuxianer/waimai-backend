var express = require('express');
var router = express.Router();
var goodsHelper = require('../Controller/GoodsHelper');
var multipart = require('connect-multiparty');
var multipartMiddileware = multipart();
var fileHelper = require('../Controller/FileHelper');
var aWss = require('./ws').aWss;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addgoods', goodsHelper.addGoodes_dev);  //dev-添加商品
router.get('/allgoods',goodsHelper.getAllGoods); //获取所有商品
router.get('/delgoods/:id', goodsHelper.deleteGoods);//删除商品byid
router.post('/addnewgoods', goodsHelper.addGoods); //添加新商品
router.post('/updategoods', goodsHelper.updateGoods);//更新商品信息

router.post('/upload',multipartMiddileware ,fileHelper.uploadImage);//图片上传

router.get('/order', function(req, res, next){
  let orderInfo  = req.body;
  console.log(aWss.clients.size);
  aWss.clients.forEach(function(client){
    client.send("orderInfo");
  })
  res.send(200);
})
module.exports = router;
