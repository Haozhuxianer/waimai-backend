var mongoose = require('mongoose');

var Scheme = mongoose.Schema;

var goodsScheme = new Scheme({
    id: Number,
    imageurl: String,
    title: String,
    subtitle: String,
    price: Number,
})

const Goods = mongoose.model('Goods', goodsScheme);

module.exports = Goods