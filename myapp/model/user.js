var mongoose = require('mongoose');

var Scheme = mongoose.Schema;

var userScheme = new Scheme({
    username: String,
    password: String,
    role: String
})

const User = mongoose.model('User', userScheme);

module.exports = User