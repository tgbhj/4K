const mongoose = require("mongoose");

const fkSchema = mongoose.Schema({
    name: {type: String, default: 'N/A'},//文件名
    size: {type: Number, default: 0},//文件大小
    title: {type: String, default: "N/A"},//中文标题
    title_en: {type: String, default: "N/A"},//英文标题
    detail: {type: String, default: "N/A"},//中文简介
    detail_en: {type: String, default: "N/A"},//英文简介
    region: {type: String, default: 'N/A'},//地区中文
    region_en: {type: String, default: 'N/A'},//地区英文
    createTime: {type: Date, default: Date.now},
    charge: {type: Number, default: 0},//0(免费),1(收费)
    group: {type: String, default: '4k'},
    type: Number,//0(电影),1(纪录片),2(旅游风光),3(综艺)
    sign: {type: Number, default: 0},//0(不需要登陆),1(需要登陆)
    views: {type: Number, default: 0},
    recommend: {type: Number, default: 0},//0(不置顶),1(置顶)
    money: {type: Number, default: 0},
    codec: {type: String, default: 'h.265'},
    poster: {type: String, default: 'N/A'},
    director: {type: String, default: 'N/A'},//导演
    director_en: {type: String, default: 'N/A'},//导演
    actors: {type: String, default: 'N/A'},//演员
    actors_en: {type: String, default: 'N/A'},//演员
    runtime: {type: Number, default: 0},//时长
    capture10: {type: String, default: 'N/A'},
    capture30: {type: String, default: 'N/A'},
    capture60: {type: String, default: 'N/A'},
    capture90: {type: String, default: 'N/A'}
});

fkSchema.statics.findRecommend = function (recommend, cb) {
    return this.find({recommend: recommend}, cb).limit(7)
};

const fk = mongoose.model("fk", fkSchema);

module.exports = fk;