const ads = require('../mongoose/ads');
const {count} = require('./4K_const');

function getPriority(count, advertisements, res) {
    ads
        .aggregate([{$match: {priority: 1}}, {$limit: count}, {$sort: {createTime: -1}}])
        .exec((err, cb1) => {
            if (cb1.length < count) {
                ads
                    .aggregate([{$match: {priority: 0}}, {$limit: count - cb1.length}, {$sort: {createTime: -1}}])
                    .exec((err, cb2) => {
                        if (cb1.length != 0) {
                            for (let i = 0; i < cb1.length; i++) {
                                ((i) => {
                                    advertisements.push(cb1[i])
                                })(i)
                            }
                            for (let i = 0; i < cb2.length; i++) {
                                ((i) => {
                                    advertisements.push(cb2[i])
                                })(i)
                            }
                            res.json({
                                code: 200,
                                msg: 'success',
                                data: advertisements
                            })
                        } else {
                            res.json({
                                code: 200,
                                msg: 'success',
                                data: cb2
                            })
                        }
                    })
            } else {
                res.json({
                    code: 200,
                    msg: 'success',
                    data: cb1
                })
            }
        })
}

function getAds(req, res) {
    ads
        .find()
        .sort({createTime: -1})
        .exec((err, cb) => {
            if (cb.length <= count) {
                res.json({
                    code: 200,
                    msg: 'success',
                    data: cb
                })
            } else {
                let advertisements = [];
                getPriority(count, advertisements, res)
            }
        })
}

module.exports = getAds;