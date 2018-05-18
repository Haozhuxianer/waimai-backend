class UserHelper {
    constructor() {
        this.userLogin = this.userLogin.bind(this);
        this.userRegister = this.userRegister.bind(this);
    }

    async userLogin(req, res, next) {
        let {username, password} = req.body;
        console.log("id:"+username+" pw:"+password);
        res.send('200');
    }

    async userRegister(req, res, next) { 
        console.log()
    }
}

module.exports = new UserHelper();