var mongoose = require('mongoose');

var Scheme = mongoose.Schema;

var orderScheme = new Scheme({
    id: Number,
    status: Number,//-1(拒绝接单)，0（等待接单），1（已结单），2（已完成）
    addressInfo: {
        name: String,
        address: String,
        gender: String,
        tel: Number,
    },
    goodsInfo: {
        id: Number,
        title: String,
        subtitle: String,
        price: Number,
    },
})

const Order = mongoose.model('Order', orderScheme);

module.exports = Order