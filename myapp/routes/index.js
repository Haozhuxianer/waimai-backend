var express = require('express');
var router = express.Router();
var goodsHelper = require('../Controller/GoodsHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addgoods', goodsHelper.addGoods);  //添加商品
router.get('/allgoods',goodsHelper.getAllGoods); //获取所有商品
router.get('/delgoods/:id', goodsHelper.deleteGoods);//删除商品byid

module.exports = router;
