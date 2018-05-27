var express = require('express');
// var app = express();
var expressWs = require('express-ws')(express);
var router = express.Router();
var aWs = require('../bin/www')

router.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send("hello");
    console.log(msg);
    console.log("router",global.aWss.getWss().clients.size)
  });
});


module.exports = {
  router
};