const mongoose = require("mongoose");

const adsSchema = mongoose.Schema({
    videoUrl: String,//视频地址
    website: String,//网站地址
    priority: {type: Number, default: 0},//优先级(0为最低)
    createTime: {type: Date, default: Date.now}
});

const ads = mongoose.model("ads", adsSchema);

module.exports = ads;