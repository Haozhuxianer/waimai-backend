var express = require('express');
// var app = express();
var expressWs = require('express-ws')(express);
var router = express.Router();


router.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    // ws.send("hello");
    console.log(msg);
  });
});


module.exports = {
  router
};