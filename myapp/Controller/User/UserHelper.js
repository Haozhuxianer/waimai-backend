var UserModel = require('../../model/user');

class UserHelper {
    constructor() {
        this.userLogin = this.userLogin.bind(this);
        this.userRegister = this.userRegister.bind(this);
    }

    async userLogin(req, res, next) {
        let {username, password} = req.body;
        console.log("id:"+username+" pw:"+password);
        try {
            var user = await UserModel.findOne({username, role: 'user'})
            if(user) {
                res.send({
                    status: 200,
                    success: '登陆成功',
                })
            } else {
                console.log('登陆失败' + err)
                res.send({
                    status: -1,
                    message: '用户不存在',
                })
            }
        } catch(err) {
            console.log('登陆失败' + err)
            res.send({
                status: -1,
                message: '登陆失败',
            });
        }
    }

    async userRegister(req, res, next) { 
        let {username, password} = req.body;
        try {
            var user = await UserModel.findOne({username, role: 'user'})
            if(!user) {
                console.log('start register')
                let createData = {
                    username,
                    password,
                    role: 'user',
                }
                await new UserModel(createData).save();
                console.log()
                res.send({
                    status: 200,
                    success: '注册成功',
                })
            }else {
                res.send({
                    status: -1,
                    message: '用户已存在，注册失败',
                })
            }
        } catch(err) {
            console.log('注册失败'+err);
            res.send({
                status: -1,
                message: '用户注册失败',
            })
        }
    }
}

module.exports = new UserHelper();