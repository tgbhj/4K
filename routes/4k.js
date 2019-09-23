const express = require('express');
const router = express.Router();
const fs = require("fs");
const ffmpeg = require('fluent-ffmpeg');
const multer = require('multer');
const getAds = require('../modules/ads');
const {saveApk, check, downApk} = require('../modules/apk');
const getLines = require('../modules/line');
const {randomWord} = require('../modules/random');
const {phoneVCode, emailVCode, signByUsername, updateUserInfo} = require('../modules/user');
const getVCode = require('../modules/VCode');
const {getVideos, saveVideo, delVideo, getRecommend, recommend, commend, addCollect, delCollect, getCollect, addHistory, getHistory} = require('../modules/video');
const {videoPath, apkPath} = require('../modules/4K_const');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.stat(videoPath, (err, stat) => {
            if (err == null) {
                if (stat.isDirectory()) {
                    console.log('文件夹存在');
                } else if (stat.isFile()) {
                    console.log('文件存在');
                } else {
                    console.log('路径存在，但既不是文件，也不是文件夹');
                    console.log(stat);
                }
            } else if (err.code == 'ENOENT') {
                console.log(err.name);
                console.log('路径不存在');
                fs.mkdir(videoPath, err => {
                    if (err) {
                        throw err
                    }
                    console.log('创建目录成功')
                })
            } else {
                console.log('错误：' + err)
            }
            cb(null, videoPath)
        })
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const apkstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.stat(apkPath, (err, stat) => {
            if (err == null) {
                if (stat.isDirectory()) {
                    console.log('文件夹存在');
                } else if (stat.isFile()) {
                    console.log('文件存在');
                } else {
                    console.log('路径存在，但既不是文件，也不是文件夹');
                    console.log(stat);
                }
            } else if (err.code == 'ENOENT') {
                console.log(err.name);
                console.log('路径不存在');
                fs.mkdir(apkPath, err => {
                    if (err) {
                        throw err
                    }
                    console.log('创建目录成功')
                })
            } else {
                console.log('错误：' + err)
            }
            cb(null, apkPath)
        })
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const apk = multer({storage: apkstorage});
const upload = multer({storage: storage});
const image = multer({storage: storage});

//apk上传
router.post('/apk', apk.single('apk'), (req, res) => {
    req.session.file = req.file;
    res.send(true);
});

//apk保存
router.post('/apkSave', (req, res) => {
    saveApk(req, res)
});

//视频封面上传
var poster = '';
router.post('/image', image.single('image'), (req, res) => {
    poster = 'https://localhost/video/' + req.file.filename;
    res.send('https://localhost/video/' + req.file.filename);
    // poster = 'https://seei.tv/video/' + req.file.filename;
    // res.send('https://seei.tv/video/' + req.file.filename);
});

//视频上传
router.post('/upload', upload.single('video'), (req, res) => {
    let video = req.file;
    req.session.videoName = randomWord(true, 36, 36) + ".mp4";
    req.session.videoCapture10 = '/video/' + req.session.videoName + '_1.webp';
    req.session.videoCapture30 = '/video/' + req.session.videoName + '_2.webp';
    req.session.videoCapture60 = '/video/' + req.session.videoName + '_3.webp';
    req.session.videoCapture90 = '/video/' + req.session.videoName + '_4.webp';
    req.session.video = video;
    fs.rename(process.cwd() + '/public/video/' + req.file.filename, process.cwd() + '/public/video/' + req.session.videoName, err => {
        if (err) {
            throw err
        }
    });
    let _path = process.cwd() + '/public/video/' + req.session.videoName;
    ffmpeg(_path)
        .screenshots({
            timestamps: ['10%', '30%', '60%', '90%'],
            filename: req.session.videoName + '.webp',
            folder: process.cwd() + '/public/video/',
            size: '1920x1080'
        })
        .on('end', () => {
            console.log('End');
            res.send('End')
        })
        .on('error', (err) => {
            console.log('截图错误：' + err);
        })
});

//视频保存
router.post("/saveVideo", (req, res) => {
    saveVideo(req, res)
});

//删除视频
router.delete('/4kdelete/:_id', (req, res) => {
    delVideo(req, res)
});

/**
 * @api {get} /4k/recommend GetRecommend(获取推荐视频)
 * @apiVersion 0.1.0
 * @apiName GetRecommend(获取推荐视频)
 * @apiGroup Videos
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: [ { _id: "5a615df09c8913220830f83e",
 *                 type: 0,
 *                 capture90: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp",
 *                 capture60: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp",
 *                 capture30: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp",
 *                 capture10: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp",
 *                 runtime: 61,
 *                 actors_en: "gfsdgsd",
 *                 actors: "gfsdgsd",
 *                 director_en: "gsfdgsd",
 *                 director: "gfsdgsd",
 *                 poster: "https://localhost/video/ps4-4.mp4.jpg",
 *                 codec: "h.265",
 *                 money: 0,
 *                 recommend: 1,
 *                 views: 0,
 *                 sign: 0,
 *                 group: "4k",
 *                 charge: 0,
 *                 createTime: "2018-01-19T02:54:40.558Z",
 *                 region: "中国",
 *                 region_en: "China",
 *                 detail_en: "gfsdsdg",
 *                 detail: "gsdfgsd",
 *                 title_en: "gfsdgsdg",
 *                 title: "gsdfgdsg",
 *                 size: 1135098,
 *                 name: "7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4" },
 *               { ... } ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 */
router.get('/recommend', (req, res) => {
    getRecommend(res)
});

//视频推荐
router.post('/recommend', (req, res) => {
    recommend(req, res)
});

//视频取消推荐
router.post('/commend', (req, res) => {
    commend(req, res)
});

/**
 * @api {get} /4k/lines GetLines(获取cdn线路)
 * @apiVersion 0.1.0
 * @apiName GetLines(获取cdn线路)
 * @apiGroup Lines
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: [ { _id: "5646b5fae361494406d66ea7",
 *                 name: "测试",
 *                 rtmp: "rtmp://222.73.36.73",
 *                 hls: "http://222.73.36.73",
 *                 sort: 2,
 *                 limit: 100,
 *                 isCdn: false,
 *                 status: "ready",
 *                 online: 0 },
 *               { ... } ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 */
router.get('/lines', (req, res) => {
    getLines(res)
});

/**
 * @api {post} /4k/vCode GetVCode(获取验证码)
 * @apiVersion 0.1.0
 * @apiName GetVCode(获取验证码)
 * @apiGroup VCode
 *
 * @apiParam {Number} phone 手机,必填(phone和email选填一个)
 * @apiParam {String} email 邮箱,必填(phone和email选填一个)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: {}
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 */
router.post('/vCode', (req, res) => {
    getVCode(req, res)
});

/**
 * @api {post} /4k/sign sign(手机/邮箱:注册/登陆)
 * @apiVersion 0.1.0
 * @apiName sign(手机/邮箱:注册/登陆)
 * @apiGroup User
 *
 * @apiParam {Number} VCode 验证码,必填
 * @apiParam {Number} phone 手机,必填(phone和email选填一个)
 * @apiParam {String} email 邮箱,必填(phone和email选填一个)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     注册
 *     {
 *       code: 200,
 *       msg: "注册成功",
 *       data: { id: "56459c227bd32c9803a65e45",
 *               username: "username",
 *               token:"7OVRajH4L5FuZ7zWgWy7bylB7XLW8UtL" }
 *     }
 *     登录
 *     {
 *       code: 200,
 *       msg: "登录成功",
 *       data: { id: "56459c227bd32c9803a65e45",
 *               username: "username",
 *               token: "7OVRajH4L5FuZ7zWgWy7bylB7XLW8UtL",
 *               phone: "123456789012",
 *               email: "213@qq.com" }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     注册
 *     {
 *       code: 502,
 *       msg: "注册失败",
 *       data: {}
 *     }
 *
 *     {
 *       code: 503,
 *       msg: "验证码不存在",
 *       data: {}
 *     }
 *
 *     {
 *       code: 504,
 *       msg: "用户已存在",
 *       data: {}
 *     }
 *     登录
 *     {
 *       code: 506,
 *       msg: "邮箱或手机号码错误",
 *       data: {}
 *     }
 *
 *     {
 *       code: 503,
 *       msg: "验证码不存在",
 *       data: {}
 *     }
 *
 *     {
 *       code: 505,
 *       msg: "验证码错误",
 *       data: {}
 *     }
 */
router.post('/sign', (req, res) => {
    if (req.body.phone != undefined) {
        phoneVCode(req, res)
    } else if (req.body.email != undefined) {
        emailVCode(req, res)
    }
});

/**
 * @api {post} /4k/signIn signIn(用户名密码登录)
 * @apiVersion 0.1.0
 * @apiName signIn(用户名密码登录)
 * @apiGroup User
 *
 * @apiParam {String} username 用户名,必填
 * @apiParam {String} password 密码,必填
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "登录成功",
 *       data: { id: "56459c227bd32c9803a65e45",
 *               username: "username",
 *               phone: "123456789012",
 *               email: "213@qq.com",
 *               token: "7OVRajH4L5FuZ7zWgWy7bylB7XLW8UtL" }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 507,
 *       msg: "用户名或密码错误",
 *       data: {}
 *     }
 */
router.post('/signIn', (req, res) => {
    signByUsername(req, res)
});

/**
 * @api {put} /4k/info info(设置用户名密码)
 * @apiVersion 0.1.0
 * @apiName info(设置用户名密码)
 * @apiGroup User
 *
 * @apiParam {String} token 用户凭证,必填
 * @apiParam {String} username 用户名,选填
 * @apiParam {String} password 密码,必填
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: {}
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 *
 *     {
 *       code: 504,
 *       msg: "用户名已存在",
 *       data: {}
 *     }
 */
router.put('/info', (req, res) => {
    updateUserInfo(req, res)
});

/**
 * @api {get} /4k/4kVideos 4kVideos(获取4k视频)
 * @apiVersion 0.1.0
 * @apiName 4kVideos(获取4k视频)
 * @apiGroup Videos
 *
 * @apiParam {Object} _id 视频id，自动生成
 * @apiParam {String} name 视频文件名，上传后随机生成
 * @apiParam {Number} size 视频文件大小
 * @apiParam {String} group 视频分类，默认值：”4k“
 * @apiParam {Date} createTime 上传时间，自动生成
 * @apiParam {String} title 中文标题
 * @apiParam {String} title_en 英文标题
 * @apiParam {String} detail 中文简介
 * @apiParam {String} detail_en 英文简介
 * @apiParam {String} director 中文导演
 * @apiParam {String} director_en 英文导演
 * @apiParam {String} actors 中文演员
 * @apiParam {String} actors_en 英文演员
 * @apiParam {Number} runtime 视频时长
 * @apiParam {String} region 地区中文
 * @apiParam {String} region 地区英文
 * @apiParam {Number} type 视频类型:0(电影),1(纪录片),2(旅游风光),3(综艺)
 * @apiParam {String} codec 视频编码(h.264,h.265)，默认值：h.265
 * @apiParam {String} poster 视频封面url
 * @apiParam {String} capture10 视频截图url(10%位置)
 * @apiParam {String} capture30 视频截图url(30%位置)
 * @apiParam {String} capture60 视频截图url(60%位置)
 * @apiParam {String} capture90 视频截图url(90%位置)
 * @apiParam {Number} recommend 0(不置顶)，1(置顶)，默认值：0
 * @apiParam {Number} views 视频点击数
 * @apiParam {Number} sign 0(不需要登陆),1(需要登陆)，默认值：0
 * @apiParam {Number} charge 0(免费),1(收费)，默认值：0
 * @apiParam {Number} money 视频费用
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: [ { _id: "5a615df09c8913220830f83e",
 *                 type: 0,
 *                 capture90: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp",
 *                 capture60: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp",
 *                 capture30: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp",
 *                 capture10: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp",
 *                 runtime: 61,
 *                 actors_en: "gfsdgsd",
 *                 actors: "gfsdgsd",
 *                 director_en: "gsfdgsd",
 *                 director: "gfsdgsd",
 *                 poster: "https://localhost/video/ps4-4.mp4.jpg",
 *                 codec: "h.265",
 *                 money: 0,
 *                 recommend: 0,
 *                 views: 0,
 *                 sign: 0,
 *                 group: "4k",
 *                 charge: 0,
 *                 createTime: "2018-01-19T02:54:40.558Z",
 *                 region: "中国",
 *                 region_en: "China",
 *                 detail_en: "gfsdsdg",
 *                 detail: "gsdfgsd",
 *                 title_en: "gfsdgsdg",
 *                 title: "gsdfgdsg",
 *                 size: 1135098,
 *                 name: "7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4" },
  *              { ... } ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 */
router.get('/4kVideos', (req, res) => {
    getVideos(req, res)
});

/**
 * @api {get} /4k/ads GetAds(获取广告)
 * @apiVersion 0.1.0
 * @apiName GetAds(获取广告)
 * @apiGroup Ads
 *
 * @apiParam {Object} _id 广告id，自动生成
 * @apiParam {String} videoUrl 视频地址
 * @apiParam {String} website 网站地址
 * @apiParam {Number} priority 优先级, 默认值：0
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: [ { _id: "5a44647b8ed6789ba12fa414",
 *                 videoUrl: "",
 *                 website: "",
 *                 createTime: "2017-01-03T09:10:31.548Z",
 *                 priority: 1 },
 *               { _id: "5a44647e8ed6789ba12fa418",
 *                 videoUrl: "",
 *                 website: "",
 *                 createTime: "2017-01-04T09:10:31.548Z",
 *                 priority: 1 },
 *               { _id: "5a4464818ed6789ba12fa41a",
 *                 videoUrl: "",
 *                 website: "",
 *                 createTime: "2017-01-05T09:10:31.548Z",
 *                 priority: 0 } ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 */
router.get('/ads', (req, res) => {
    getAds(req, res)
});

/**
 * @api {post} /4k/collect/add CollectAdd(收藏视频)
 * @apiVersion 0.1.0
 * @apiName CollectAdd(收藏视频)
 * @apiGroup Videos
 *
 * @apiParam {String} token 用户凭证,必填
 * @apiParam {String} videoId 视频id,必填
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: {}
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 *
 *     {
 *       code: 508,
 *       msg: "token错误",
 *       data: {}
 *     }
 */
router.post('/collect/add', (req, res) => {
    addCollect(req, res)
});

/**
 * @api {post} /4k/collect/del CollectDel(删除收藏视频)
 * @apiVersion 0.1.0
 * @apiName CollectDel(删除收藏视频)
 * @apiGroup Videos
 *
 * @apiParam {String} token 用户凭证,必填
 * @apiParam {String} videoId 视频id,必填
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: {}
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 *
 *     {
 *       code: 508,
 *       msg: "token错误",
 *       data: {}
 *     }
 */
router.post('/collect/del', (req, res) => {
    delCollect(req, res)
});

/**
 * @api {get} /4k/collect/all GetCollect(获取所有收藏视频)
 * @apiVersion 0.1.0
 * @apiName GetCollect(获取所有收藏视频)
 * @apiGroup Videos
 *
 * @apiParam {String} token 用户凭证,必填(放在请求头中)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: [ { _id: "5a615df09c8913220830f83e",
 *                 type: 0,
 *                 capture90: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp",
 *                 capture60: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp",
 *                 capture30: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp",
 *                 capture10: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp",
 *                 runtime: 61,
 *                 actors_en: "gfsdgsd",
 *                 actors: "gfsdgsd",
 *                 director_en: "gsfdgsd",
 *                 director: "gfsdgsd",
 *                 poster: "https://localhost/video/ps4-4.mp4.jpg",
 *                 codec: "h.265",
 *                 money: 0,
 *                 recommend: 0,
 *                 views: 0,
 *                 sign: 0,
 *                 group: "4k",
 *                 charge: 0,
 *                 createTime: "2018-01-19T02:54:40.558Z",
 *                 region: "中国",
 *                 region_en: "China",
 *                 detail_en: "gfsdsdg",
 *                 detail: "gsdfgsd",
 *                 title_en: "gfsdgsdg",
 *                 title: "gsdfgdsg",
 *                 size: 1135098,
 *                 name: "7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4"},
 *               { ... } ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 *
 *     {
 *       code: 508,
 *       msg: "token错误",
 *       data: {}
 *     }
 */
router.get('/collect/all', (req, res) => {
    getCollect(req, res)
});

/**
 * @api {post} /4k/history/add HistoryAdd(生成历史记录)
 * @apiVersion 0.1.0
 * @apiName HistoryAdd(生成历史记录)
 * @apiGroup Videos
 *
 * @apiParam {String} token 用户凭证,必填
 * @apiParam {String} videoId 视频id,必填
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: {}
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 *
 *     {
 *       code: 508,
 *       msg: "token错误",
 *       data: {}
 *     }
 */
router.post('/history/add', (req, res) => {
    addHistory(req, res)
});

/**
 * @api {get} /4k/history/all GetHistory(获取所有历史记录)
 * @apiVersion 0.1.0
 * @apiName GetHistory(获取所有历史记录)
 * @apiGroup Videos
 *
 * @apiParam {String} token 用户凭证,必填(放在请求头中)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "success",
 *       data: [ { _id: "5a615df09c8913220830f83e",
 *                 type: 0,
 *                 capture90: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp",
 *                 capture60: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp",
 *                 capture30: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp",
 *                 capture10: "/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp",
 *                 runtime: 61,
 *                 actors_en: "gfsdgsd",
 *                 actors: "gfsdgsd",
 *                 director_en: "gsfdgsd",
 *                 director: "gfsdgsd",
 *                 poster: "https://localhost/video/ps4-4.mp4.jpg",
 *                 codec: "h.265",
 *                 money: 0,
 *                 recommend: 0,
 *                 views: 0,
 *                 sign: 0,
 *                 group: "4k",
 *                 charge: 0,
 *                 createTime: "2018-01-19T02:54:40.558Z",
 *                 region: "中国",
 *                 region_en: "China",
 *                 detail_en: "gfsdsdg",
 *                 detail: "gsdfgsd",
 *                 title_en: "gfsdgsdg",
 *                 title: "gsdfgdsg",
 *                 size: 1135098,
 *                 name: "7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4"},
 *               { ... } ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 501,
 *       msg: "err",
 *       data: {}
 *     }
 *
 *     {
 *       code: 508,
 *       msg: "token错误",
 *       data: {}
 *     }
 */
router.get('/history/all', (req, res) => {
    getHistory(req, res)
});

/**
 * @api {post} /4k/checkVersion CheckVersion(检查更新)
 * @apiVersion 0.1.0
 * @apiName CheckVersion(检查更新)
 * @apiGroup Apk
 *
 * @apiParam {Number} versionCode 版本号,必填(true需要更新，false不需要更新)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "not update",
 *       data: false
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: "update",
 *       data: true
 *     }
 */
router.post('/checkVersion', (req, res) => {
    check(req, res)
});

/**
 * @api {get} /4k/apkDown ApkDown(apk下载)
 * @apiVersion 0.1.0
 * @apiName ApkDown(apk下载)
 * @apiGroup Apk
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     http://localhost/fkapk/SeeiUHD(xxx).apk
 */
router.get('/apkDown', (req, res) => {
    downApk(req, res)
});

router.get('/4k', (req, res) => {
    res.render('4k')
});

/**
 * @api / code码
 * @apiVersion 0.1.0
 * @apiName code码
 * @apiGroup code
 *
 *  * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: 'success',
 *       data: {}
 *     }
 *     {
 *       code: 501,
 *       msg: 'err',
 *       data: {}
 *     }
 *     {
 *       code: 502,
 *       msg: '注册失败',
 *       data: {}
 *     }
 *     {
 *       code: 503,
 *       msg: '验证码不存在',
 *       data: {}
 *     }
 *     {
 *       code: 504,
 *       msg: '用户已存在',
 *       data: {}
 *     }
 *     {
 *       code: 505,
 *       msg: '验证码错误',
 *       data: {}
 *     }
 *     {
 *       code: 506,
 *       msg: '邮箱或手机号码错误',
 *       data: {}
 *     }
 *     {
 *       code: 507,
 *       msg: '用户名或密码错误',
 *       data: {}
 *     }
 *     {
 *       code: 508,
 *       msg: 'token错误',
 *       data: {}
 *     }
 */

module.exports = router;