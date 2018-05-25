var express = require('express');
var router = express.Router();
var goodsHelper = require('../Controller/GoodsHelper');
var multipart = require('connect-multiparty');
var multipartMiddileware = multipart();
var fileHelper = require('../Controller/FileHelper');

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
module.exports = router;
