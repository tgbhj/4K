const mongoose = require("mongoose");

const fkuserSchema = mongoose.Schema({
    username: {type: String, default: ''},//用户名(唯一)
    password: {type: String, default: ''}, //密码
    email: {type: String, default: ''},//邮箱(唯一)
    phone: {type: String, default: ''},//电话(唯一)
    regTime: {type: Date, default: Date.now},//注册时间
    face: {type: String, default: ''},
    token: {type: String, default: ''},
    fkcord: {type: mongoose.Schema.ObjectId, ref: 'fkcord'},
    orders: [{type: mongoose.Schema.ObjectId, ref: 'order'}]
});

fkuserSchema.statics.findUser = function (username, password, cb) {
    return this.findOne({username: username, password: password}, cb)
};

fkuserSchema.statics.findByToken = function (token, cb) {
    return this.findOne({token: token}, cb)
};

fkuserSchema.statics.findOneUser = function (info, cb) {
    if (/@/.test(info)) {
        return this.findOne({email: info}, cb)
    } else {
        return this.findOne({phone: info}, cb)
    }
};

const fkuser = mongoose.model("fkuser", fkuserSchema);

module.exports = fkuser;