var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.once('open', () => {
    console.log('链接成功');
})

db.on('error', function(error) {
    console.log('MongoDB Connect Error for' + error);
    mongoose.disconnect();
})

db.on('close', () => {
    console.log('DB connect is close and reconnecting now');
    mongoose.connect('mongodb://localhost/test');
})

module.exports = db;