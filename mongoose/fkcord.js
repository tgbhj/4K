const mongoose = require("mongoose");

const fkcordSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "user"},
    pay: [{video: {type: mongoose.Schema.ObjectId, ref: "fk"}}],//购买
    collect: [{type: mongoose.Schema.ObjectId, ref: "fk"}],//收藏
    history: [{type: mongoose.Schema.ObjectId, ref: "fk"}]//播放记录
});

fkcordSchema.statics.findByUser = function (_id, cb) {
    return this.findOne({user: _id}, cb)
};

const fkcord = mongoose.model("fkcord", fkcordSchema);

module.exports = fkcord;