const fkuser = require('../mongoose/fkusers');
const fkcord = require('../mongoose/fkcord');
const findPwd = require('../mongoose/findPwd');
const crypto = require("crypto");
const moment = require("moment");
const {randomWord} = require('./random');

function signUpByPhone(req, res) {
    new fkuser({
        username: req.body.phone,
        phone: req.body.phone,
        email: req.body.phone,
        token: randomWord(true, 36, 36)
    }).save((err, cb) => {
        if (cb != null) {
            new fkcord({
                user: cb._id
            }).save((err, record) => {
                fkuser
                    .findByIdAndUpdate(cb._id, {$set: {fkcord: record._id}})
                    .exec()
            });
            res.json({
                code: 200,
                msg: '注册成功',
                data: {id: cb._id, username: cb.username, token: cb.token}
            })
        } else {
            res.json({
                code: 502,
                msg: '注册失败',
                data: {}
            })
        }

    })
}

function signUpByEmail(req, res) {
    new fkuser({
        username: req.body.email,
        email: req.body.email,
        phone: req.body.email,
        token: randomWord(true, 36, 36)
    }).save((err, cb) => {
        if (cb != null) {
            new fkcord({
                user: cb._id
            }).save((err, record) => {
                fkuser
                    .findByIdAndUpdate(cb._id, {$set: {fkcord: record._id}})
                    .exec()
            });
            res.json({
                code: 200,
                msg: '注册成功',
                data: {id: cb._id, username: cb.username, token: cb.token}
            })
        } else {
            res.json({
                code: 502,
                msg: '注册失败',
                data: {}
            })
        }
    })
}

function phoneVCode(req, res) {
    findPwd
        .find({phone: req.body.phone})
        .where('getTime').gte(moment().subtract(5, 'minutes')._d).lte(new Date())
        .limit(1)
        .sort({getTime: -1})
        .exec((err, cb) => {
            if (cb.length == 0) {
                res.json({
                    code: 503,
                    msg: '验证码不存在',
                    data: {}
                })
            } else {
                if (cb[0].vcode == parseInt(req.body.VCode) && !cb[0].isUsed) {
                    findPwd
                        .findOneAndUpdate({phone: req.body.phone}, {$set: {isUsed: true}})
                        .sort({getTime: -1})
                        .exec();
                    fkuser
                        .findOneUser(req.body.phone)
                        .exec((err, cb) => {
                            if (cb == null) {
                                signUpByPhone(req, res)
                            } else {
                                signIn(res, cb)
                            }
                        })
                } else {
                    res.json({
                        code: 505,
                        msg: '验证码错误',
                        data: {}
                    })
                }
            }
        })
}

function emailVCode(req, res) {
    findPwd
        .find({email: req.body.email})
        .where('getTime').gte(moment().subtract(5, 'minutes')._d).lte(new Date())
        .limit(1)
        .sort({getTime: -1})
        .exec((err, cb) => {
            if (cb.length == 0) {
                res.json({
                    code: 503,
                    msg: '验证码不存在',
                    data: {}
                })
            } else {
                if (cb[0].vcode == parseInt(req.body.VCode) && !cb[0].isUsed) {
                    findPwd
                        .findOneAndUpdate({email: req.body.email}, {$set: {isUsed: true}})
                        .sort({getTime: -1})
                        .exec();
                    fkuser
                        .findOneUser(req.body.email)
                        .exec((err, cb) => {
                            if (cb == null) {
                                signUpByEmail(req, res)
                            } else {
                                signIn(res, cb)
                            }
                        })
                } else {
                    res.json({
                        code: 505,
                        msg: '验证码错误',
                        data: {}
                    })
                }
            }
        })
}

function updateToken(res, cb) {
    fkuser
        .findByIdAndUpdate({_id: cb._id}, {$set: {token: randomWord(true, 36, 36)}}, {new: true})
        .exec((err, cb) => {
            let info = {
                _id: cb._id,
                username: cb.username,
                token: cb.token,
                phone: cb.phone,
                email: cb.email
            };
            res.json({
                code: 200,
                msg: '登录成功',
                data: info
            })
        })
}

function signIn(res, cb) {
    fkuser
        .findById(cb._id)
        .exec((err, cb) => {
            if (cb != null) {
                updateToken(res, cb)
            } else {
                res.json({
                    code: 506,
                    msg: '邮箱或手机号码错误',
                    data: {}
                })
            }
        })
}

function signByUsername(req, res) {
    req.body.password = crypto.createHash('md5').update(req.body.password + ':adinno').digest('hex');
    fkuser
        .findUser(req.body.username, req.body.password)
        .exec((err, cb) => {
            if (cb != null) {
                updateToken(res, cb)
            } else {
                res.json({
                    code: 507,
                    msg: '用户名或密码错误',
                    data: {}
                })
            }
        })
}

function updateUserInfo(req, res) {
    req.body.password = crypto.createHash('md5').update(req.body.password + ':adinno').digest('hex');
    fkuser
        .findByToken(req.body.token)
        .exec((err, cb) => {
            if (req.body.username != null) {
                if (cb.username != req.body.username) {
                    fkuser
                        .findByIdAndUpdate(cb._id, {
                            $set: {
                                username: req.body.username,
                                password: req.body.password
                            }
                        })
                        .exec((err, cb) => {
                            if (cb != null) {
                                res.json({
                                    code: 200,
                                    msg: 'success',
                                    data: {}
                                })
                            } else {
                                res.json({
                                    code: 501,
                                    msg: 'err',
                                    data: {}
                                })
                            }
                        })
                } else {
                    res.json({
                        code: 504,
                        msg: '用户名已存在',
                        data: {}
                    })
                }
            } else {
                fkuser
                    .findByIdAndUpdate(cb._id, {$set: {password: req.body.password}})
                    .exec((err, cb) => {
                        if (cb != null) {
                            res.json({
                                code: 200,
                                msg: 'success',
                                data: {}
                            })
                        } else {
                            res.json({
                                code: 501,
                                msg: 'err',
                                data: {}
                            })
                        }
                    })
            }
        })
}

module.exports = {phoneVCode, emailVCode, signByUsername, updateUserInfo};