const findPwd = require('../mongoose/findPwd');
const nodemailer = require('nodemailer');
const request = require('request');
const {number} = require('./random');
const {debug} = require('./4K_const');

function getVCode(req, res) {
    let vcode = number(true, 6, 6);
    if (req.body.phone != undefined) {
        stp(req, res, vcode)
    } else if (req.body.email != undefined) {
        ste(req, res, vcode)
    }
}

function stp(req, res, vcode) {
    new findPwd({phone: req.body.phone, vcode: vcode})
        .save((err, cb) => {
            if (!debug) {
                request({
                    method: 'post',
                    url: 'http://seei.tv/sendVCode',
                    form: {phone: req.body.phone, vcode: vcode}
                }, (err, response, body) => {
                    if (err == null) {
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
                    code: 200,
                    msg: 'success',
                    data: vcode
                })
            }
        })
}

function ste(req, res, vcode) {
    new findPwd({email: req.body.email, vcode: vcode})
        .save((err, cb) => {
            if (!debug) {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.mxhichina.com',
                    secure: true, // 使用 SSL
                    port: 465,
                    auth: {
                        user: 'jiezhang@adinno.org',
                        pass: '#ADINNO1234'
                    }
                });

                let mailOptions = {
                    from: "zhangjie <jiezhang@adinno.org>",
                    to: req.body.email,
                    subject: "SEEi.TV Verification Code",
                    html: "<span>Verification Code：" + cb.vcode + "</span>"
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.json({
                            code: 501,
                            msg: 'err',
                            data: {}
                        })
                    } else {
                        res.json({
                            code: 200,
                            msg: 'success',
                            data: {}
                        })
                    }
                })
            } else {
                res.json({
                    code: 200,
                    msg: 'success',
                    data: vcode
                })
            }
        })
}

module.exports = getVCode;