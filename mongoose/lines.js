/**
 * Created by Administrator on 2015/9/2.
 */
const mongoose = require("mongoose");

const lineSchema = mongoose.Schema({
    name: String,
    ip: String,
    rtmp: String,
    hls: String,
    online: {type: Number, default: 0},
    sort: Number,
    limit: Number,
    status: {type: String, default: "ready"},
    isCdn: {type: Boolean, default: false}
});

lineSchema.statics.findByStatus = function (status, cb) {
    return this.find({status: status}, cb)
};

const line = mongoose.model("line", lineSchema);

module.exports = line;