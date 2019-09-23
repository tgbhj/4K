const fk = require('../mongoose/fks');
const fkuser = require('../mongoose/fkusers');
const fkcord = require('../mongoose/fkcord');
const {reCmd} = require('./4K_const');

function getVideos(req, res) {
    fk
        .find()
        .exec((err, cb) => {
            if (!err) {
                res.json({
                    code: 200,
                    msg: 'success',
                    data: cb
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

function saveVideo(req, res, poster) {
    new fk({
        name: req.session.videoName,
        size: req.session.video.size,
        title: req.body.title,
        title_en: req.body.title_en,
        detail: req.body.detail,
        detail_en: req.body.detail_en,
        type: req.body.type,
        codec: req.body.codec,
        sign: req.body.sign,
        charge: req.body.charge,
        money: req.body.money,
        runtime: req.body.runtime,
        director: req.body.director,
        director_en: req.body.director_en,
        actors: req.body.actors,
        actors_en: req.body.actors_en,
        region: req.body.region,
        region_en: req.body.region_en,
        poster: poster,
        capture10: req.session.videoCapture10,
        capture30: req.session.videoCapture30,
        capture60: req.session.videoCapture60,
        capture90: req.session.videoCapture90
    }).save((err, cb) => {
        res.json({
            code: 200,
            msg: 'success',
            data: cb
        })
    })
}

function delVideo(req, res) {
    fk
        .remove({_id: req.headers._id})
        .exec((err, cb) => {
            if (err == null) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
}

function getRecommend(res) {
    fk
        .findRecommend(reCmd)
        .exec((err, cb) => {
            if (err == null) {
                res.json({
                    code: 200,
                    msg: 'success',
                    data: cb
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

function recommend(req, res) {
    for (let i = 0; i < req.body.length; i++) {
        ((i) => {
            fk
                .findByIdAndUpdate({_id: req.body[i]._id}, {$set: {recommend: 1}})
                .exec()
        })(i)
    }
    if (req.body.length == i) {
        res.send(true)
    } else {
        res.send(false)
    }
}

function commend(req, res) {
    for (let i = 0; i < req.body.length; i++) {
        ((i) => {
            fk
                .findByIdAndUpdate({_id: req.body[i]._id}, {$set: {recommend: 0}})
                .exec()
        })(i)
    }
    if (req.body.length == i) {
        res.send(true)
    } else {
        res.send(false)
    }
}

async function search(ids) {
    let promises = ids.map((id) => fk.findById(id).exec());
    return await Promise.all(promises);
}

function updateCollect(req, res, user) {
    fkcord
        .findOneAndUpdate({user: user._id}, {$push: {collect: req.body.videoId}})
        .exec((err, cb) => {
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
}

function addCollect(req, res) {
    fkuser
        .findByToken(req.body.token)
        .exec((err, user) => {
            if (user != null) {
                fkcord
                    .findOneAndUpdate({user: user._id}, {$pull: {collect: req.body.videoId}})
                    .exec((err, cb) => {
                        if (err == null) {
                            updateCollect(req, res, user)
                        } else {
                            updateCollect(req, res, user)
                        }
                    })
            } else {
                res.json({
                    code: 508,
                    msg: 'token错误',
                    data: {}
                })
            }
        })
}

function delCollect(req, res) {
    fkuser
        .findByToken(req.body.token)
        .exec((err, user) => {
            if (user != null) {
                fkcord
                    .findOneAndUpdate({user: user._id}, {$pull: {collect: req.body.videoId}})
                    .exec((err, cb) => {
                        if (err == mull) {
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
                    code: 508,
                    msg: 'token错误',
                    data: {}
                })
            }
        })
}

function getCollect(req, res) {
    fkuser
        .findByToken(req.headers.token)
        .exec((err, cb) => {
            if (cb != null) {
                fkcord
                    .findByUser(cb._id)
                    .exec(async(err, cb) => {
                        let ids = cb.collect;
                        let collect = await search(ids);
                        res.json({
                            code: 200,
                            msg: 'success',
                            data: collect
                        })
                    });
            } else {
                res.json({
                    code: 508,
                    msg: 'token错误',
                    data: {}
                })
            }
        })
}

function updateHistory(req, res, user) {
    fkcord
        .findOneAndUpdate({user: user._id}, {$push: {history: req.body.videoId}})
        .exec((err, cb) => {
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
}

function addHistory(req, res) {
    fkuser
        .findByToken(req.body.token)
        .exec((err, user) => {
            if (user != null) {
                fkcord
                    .findOneAndUpdate({user: user._id}, {$pull: {history: req.body.videoId}})
                    .exec((err, cb) => {
                        if (err == null) {
                            updateHistory(req, res, user)
                        } else {
                            updateHistory(req, res, user)
                        }
                    })
            } else {
                res.json({
                    code: 508,
                    msg: 'token错误',
                    data: {}
                })
            }
        })
}

function getHistory(req, res) {
    fkuser
        .findByToken(req.headers.token)
        .exec((err, cb) => {
            if (cb != null) {
                fkcord
                    .findByUser(cb._id)
                    .exec(async (err, cb) => {
                        let ids = cb.history;
                        let history = await search(ids);
                        res.json({
                            code: 200,
                            msg: 'success',
                            data: history
                        })
                    })
            } else {
                res.json({
                    code: 508,
                    msg: 'token错误',
                    data: {}
                })
            }
        })
}

module.exports = {
    getVideos,
    saveVideo,
    delVideo,
    getRecommend,
    recommend,
    commend,
    addCollect,
    delCollect,
    getCollect,
    addHistory,
    getHistory
};