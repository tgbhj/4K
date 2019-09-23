/**
 * Created by Administrator on 2017-05-11.
 */

const mongoose = require("mongoose");
const findPwdSchema = mongoose.Schema({
    phone: String,
    email: String,
    vcode: Number,// 只能输入6位数字
    isUsed: {type: Boolean, default: false},// 验证码是否使用过
    getTime: {type: Date, default: Date.now},// 有效时间
});

const findPwd = mongoose.model("findPwd", findPwdSchema);

module.exports = findPwd;