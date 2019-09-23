const mongoose = require("mongoose");

const fkapkSchema = mongoose.Schema({
    apkName: String,
    createTime: {type: Date, default: Date.now},
    versionCode: Number,
    detail: String
});

fkapkSchema.statics.findApk = function (cb) {
    return this.findOne(cb).sort({createTime: -1})
};

const fkapk = mongoose.model("fkapk", fkapkSchema);

module.exports = fkapk;