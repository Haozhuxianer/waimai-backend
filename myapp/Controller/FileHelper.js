var fs = require('fs');

class FileHeler {
    constructor() {
        this.uploadImage = this.uploadImage.bind(this)
    }

    async uploadImage(req, res, next){
        var imgData = req.body.imgdata;
        var dataBuffer = new Buffer(imgData, 'base64');
        let path = 'C:/Users/Hzxr/Desktop/demo2/myapp/public/images/'+req.body.filename;
        fs.writeFile(path, dataBuffer, function(err){
          if(err) {
            res.send({
              status: -1
            });
          }else {
            res.send(200);
          }
          console.log(err);
        })
    }
}

module.exports = new FileHeler();