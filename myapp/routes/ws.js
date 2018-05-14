var express = require('express');
// var app = express();
var expressWs = require('express-ws')(express);
var router = express.Router();

 
router.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    // ws.send(msg);
    ws.send('hello client')
    console.log("hello ws")
  });
});

module.exports = router;