const fkapk = require('../mongoose/fkapks');

function saveApk(req, res) {
    new fkapk({
        apkName: req.session.file.filename,
        versionCode: req.body.versionCode,
        detail: req.body.detail
    }).save((err, cb) => {
        if (cb != null) {
            res.send(true)
        } else {
            res.send(false)
        }
    })
}

function check(req, res) {
    fkapk
        .findApk()
        .exec((err, cb) => {
            if (req.body.versionCode >= cb.versionCode) {
                res.json({ //不用更新
                    code: 200,
                    msg: 'not update',
                    data: false
                })
            } else {
                res.json({ //需要更新
                    code: 200,
                    msg: 'update',
                    data: true
                })
            }
        })
}

function downApk(req, res) {
    fkapk
        .findApk()
        .exec((err, cb) => {
            res.download("./public/fkapk/" + cb.apkName);
        })
}

module.exports = {saveApk, check, downApk};