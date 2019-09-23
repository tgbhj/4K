const line = require('../mongoose/lines');
const {status} = require('./4K_const');

function getLines(res) {
    line
        .findByStatus(status)
        .exec((err, cb) => {
            res.json({
                code: 200,
                msg: 'success',
                data: cb
            })
        })
}

module.exports = getLines;