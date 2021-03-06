define({ "api": [
  {
    "type": "get",
    "url": "/4k/ads",
    "title": "GetAds(获取广告)",
    "version": "0.1.0",
    "name": "GetAds______",
    "group": "Ads",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_id",
            "description": "<p>广告id，自动生成</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoUrl",
            "description": "<p>视频地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>网站地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>优先级, 默认值：0</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: [ { _id: \"5a44647b8ed6789ba12fa414\",\n            videoUrl: \"\",\n            website: \"\",\n            createTime: \"2017-01-03T09:10:31.548Z\",\n            priority: 1 },\n          { _id: \"5a44647e8ed6789ba12fa418\",\n            videoUrl: \"\",\n            website: \"\",\n            createTime: \"2017-01-04T09:10:31.548Z\",\n            priority: 1 },\n          { _id: \"5a4464818ed6789ba12fa41a\",\n            videoUrl: \"\",\n            website: \"\",\n            createTime: \"2017-01-05T09:10:31.548Z\",\n            priority: 0 } ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Ads"
  },
  {
    "type": "get",
    "url": "/4k/apkDown",
    "title": "ApkDown(apk下载)",
    "version": "0.1.0",
    "name": "ApkDown_apk___",
    "group": "Apk",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nhttp://localhost/fkapk/SeeiUHD(xxx).apk",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Apk"
  },
  {
    "type": "post",
    "url": "/4k/checkVersion",
    "title": "CheckVersion(检查更新)",
    "version": "0.1.0",
    "name": "CheckVersion______",
    "group": "Apk",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "versionCode",
            "description": "<p>版本号,必填(true需要更新，false不需要更新)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"not update\",\n  data: false\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"update\",\n  data: true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Apk"
  },
  {
    "type": "get",
    "url": "/4k/lines",
    "title": "GetLines(获取cdn线路)",
    "version": "0.1.0",
    "name": "GetLines___cdn___",
    "group": "Lines",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: [ { _id: \"5646b5fae361494406d66ea7\",\n            name: \"测试\",\n            rtmp: \"rtmp://222.73.36.73\",\n            hls: \"http://222.73.36.73\",\n            sort: 2,\n            limit: 100,\n            isCdn: false,\n            status: \"ready\",\n            online: 0 },\n          { ... } ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Lines"
  },
  {
    "type": "put",
    "url": "/4k/info",
    "title": "info(设置用户名密码)",
    "version": "0.1.0",
    "name": "info_________",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名,选填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码,必填</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}\n\n{\n  code: 504,\n  msg: \"用户名已存在\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/4k/signIn",
    "title": "signIn(用户名密码登录)",
    "version": "0.1.0",
    "name": "signIn_________",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码,必填</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"登录成功\",\n  data: { id: \"56459c227bd32c9803a65e45\",\n          username: \"username\",\n          phone: \"123456789012\",\n          email: \"213@qq.com\",\n          token: \"7OVRajH4L5FuZ7zWgWy7bylB7XLW8UtL\" }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 507,\n  msg: \"用户名或密码错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/4k/sign",
    "title": "sign(手机/邮箱:注册/登陆)",
    "version": "0.1.0",
    "name": "sign_____________",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "VCode",
            "description": "<p>验证码,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>手机,必填(phone和email选填一个)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱,必填(phone和email选填一个)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n注册\n{\n  code: 200,\n  msg: \"注册成功\",\n  data: { id: \"56459c227bd32c9803a65e45\",\n          username: \"username\",\n          token:\"7OVRajH4L5FuZ7zWgWy7bylB7XLW8UtL\" }\n}\n登录\n{\n  code: 200,\n  msg: \"登录成功\",\n  data: { id: \"56459c227bd32c9803a65e45\",\n          username: \"username\",\n          token: \"7OVRajH4L5FuZ7zWgWy7bylB7XLW8UtL\",\n          phone: \"123456789012\",\n          email: \"213@qq.com\" }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n注册\n{\n  code: 502,\n  msg: \"注册失败\",\n  data: {}\n}\n\n{\n  code: 503,\n  msg: \"验证码不存在\",\n  data: {}\n}\n\n{\n  code: 504,\n  msg: \"用户已存在\",\n  data: {}\n}\n登录\n{\n  code: 506,\n  msg: \"邮箱或手机号码错误\",\n  data: {}\n}\n\n{\n  code: 503,\n  msg: \"验证码不存在\",\n  data: {}\n}\n\n{\n  code: 505,\n  msg: \"验证码错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/4k/vCode",
    "title": "GetVCode(获取验证码)",
    "version": "0.1.0",
    "name": "GetVCode_______",
    "group": "VCode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>手机,必填(phone和email选填一个)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱,必填(phone和email选填一个)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "VCode"
  },
  {
    "type": "get",
    "url": "/4k/4kVideos",
    "title": "4kVideos(获取4k视频)",
    "version": "0.1.0",
    "name": "4kVideos___4k___",
    "group": "Videos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_id",
            "description": "<p>视频id，自动生成</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>视频文件名，上传后随机生成</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>视频文件大小</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>视频分类，默认值：”4k“</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "createTime",
            "description": "<p>上传时间，自动生成</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>中文标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title_en",
            "description": "<p>英文标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>中文简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail_en",
            "description": "<p>英文简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>中文导演</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "director_en",
            "description": "<p>英文导演</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actors",
            "description": "<p>中文演员</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actors_en",
            "description": "<p>英文演员</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "runtime",
            "description": "<p>视频时长</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>地区中文</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>视频类型:0(电影),1(纪录片),2(旅游风光),3(综艺)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "codec",
            "description": "<p>视频编码(h.264,h.265)，默认值：h.265</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "poster",
            "description": "<p>视频封面url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capture10",
            "description": "<p>视频截图url(10%位置)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capture30",
            "description": "<p>视频截图url(30%位置)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capture60",
            "description": "<p>视频截图url(60%位置)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capture90",
            "description": "<p>视频截图url(90%位置)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "recommend",
            "description": "<p>0(不置顶)，1(置顶)，默认值：0</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "views",
            "description": "<p>视频点击数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sign",
            "description": "<p>0(不需要登陆),1(需要登陆)，默认值：0</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "charge",
            "description": "<p>0(免费),1(收费)，默认值：0</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "money",
            "description": "<p>视频费用</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: [ { _id: \"5a615df09c8913220830f83e\",\n            type: 0,\n            capture90: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp\",\n            capture60: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp\",\n            capture30: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp\",\n            capture10: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp\",\n            runtime: 61,\n            actors_en: \"gfsdgsd\",\n            actors: \"gfsdgsd\",\n            director_en: \"gsfdgsd\",\n            director: \"gfsdgsd\",\n            poster: \"https://localhost/video/ps4-4.mp4.jpg\",\n            codec: \"h.265\",\n            money: 0,\n            recommend: 0,\n            views: 0,\n            sign: 0,\n            group: \"4k\",\n            charge: 0,\n            createTime: \"2018-01-19T02:54:40.558Z\",\n            region: \"中国\",\n            region_en: \"China\",\n            detail_en: \"gfsdsdg\",\n            detail: \"gsdfgsd\",\n            title_en: \"gfsdgsdg\",\n            title: \"gsdfgdsg\",\n            size: 1135098,\n            name: \"7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4\" },\n         { ... } ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "post",
    "url": "/4k/collect/add",
    "title": "CollectAdd(收藏视频)",
    "version": "0.1.0",
    "name": "CollectAdd______",
    "group": "Videos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>视频id,必填</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}\n\n{\n  code: 508,\n  msg: \"token错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "post",
    "url": "/4k/collect/del",
    "title": "CollectDel(删除收藏视频)",
    "version": "0.1.0",
    "name": "CollectDel________",
    "group": "Videos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>视频id,必填</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}\n\n{\n  code: 508,\n  msg: \"token错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "get",
    "url": "/4k/collect/all",
    "title": "GetCollect(获取所有收藏视频)",
    "version": "0.1.0",
    "name": "GetCollect__________",
    "group": "Videos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填(放在请求头中)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: [ { _id: \"5a615df09c8913220830f83e\",\n            type: 0,\n            capture90: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp\",\n            capture60: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp\",\n            capture30: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp\",\n            capture10: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp\",\n            runtime: 61,\n            actors_en: \"gfsdgsd\",\n            actors: \"gfsdgsd\",\n            director_en: \"gsfdgsd\",\n            director: \"gfsdgsd\",\n            poster: \"https://localhost/video/ps4-4.mp4.jpg\",\n            codec: \"h.265\",\n            money: 0,\n            recommend: 0,\n            views: 0,\n            sign: 0,\n            group: \"4k\",\n            charge: 0,\n            createTime: \"2018-01-19T02:54:40.558Z\",\n            region: \"中国\",\n            region_en: \"China\",\n            detail_en: \"gfsdsdg\",\n            detail: \"gsdfgsd\",\n            title_en: \"gfsdgsdg\",\n            title: \"gsdfgdsg\",\n            size: 1135098,\n            name: \"7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4\"},\n          { ... } ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}\n\n{\n  code: 508,\n  msg: \"token错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "get",
    "url": "/4k/history/all",
    "title": "GetHistory(获取所有历史记录)",
    "version": "0.1.0",
    "name": "GetHistory__________",
    "group": "Videos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填(放在请求头中)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: [ { _id: \"5a615df09c8913220830f83e\",\n            type: 0,\n            capture90: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp\",\n            capture60: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp\",\n            capture30: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp\",\n            capture10: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp\",\n            runtime: 61,\n            actors_en: \"gfsdgsd\",\n            actors: \"gfsdgsd\",\n            director_en: \"gsfdgsd\",\n            director: \"gfsdgsd\",\n            poster: \"https://localhost/video/ps4-4.mp4.jpg\",\n            codec: \"h.265\",\n            money: 0,\n            recommend: 0,\n            views: 0,\n            sign: 0,\n            group: \"4k\",\n            charge: 0,\n            createTime: \"2018-01-19T02:54:40.558Z\",\n            region: \"中国\",\n            region_en: \"China\",\n            detail_en: \"gfsdsdg\",\n            detail: \"gsdfgsd\",\n            title_en: \"gfsdgsdg\",\n            title: \"gsdfgdsg\",\n            size: 1135098,\n            name: \"7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4\"},\n          { ... } ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}\n\n{\n  code: 508,\n  msg: \"token错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "get",
    "url": "/4k/recommend",
    "title": "GetRecommend(获取推荐视频)",
    "version": "0.1.0",
    "name": "GetRecommend________",
    "group": "Videos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: [ { _id: \"5a615df09c8913220830f83e\",\n            type: 0,\n            capture90: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_4.webp\",\n            capture60: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_3.webp\",\n            capture30: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_2.webp\",\n            capture10: \"/video/7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4_1.webp\",\n            runtime: 61,\n            actors_en: \"gfsdgsd\",\n            actors: \"gfsdgsd\",\n            director_en: \"gsfdgsd\",\n            director: \"gfsdgsd\",\n            poster: \"https://localhost/video/ps4-4.mp4.jpg\",\n            codec: \"h.265\",\n            money: 0,\n            recommend: 1,\n            views: 0,\n            sign: 0,\n            group: \"4k\",\n            charge: 0,\n            createTime: \"2018-01-19T02:54:40.558Z\",\n            region: \"中国\",\n            region_en: \"China\",\n            detail_en: \"gfsdsdg\",\n            detail: \"gsdfgsd\",\n            title_en: \"gfsdgsdg\",\n            title: \"gsdfgdsg\",\n            size: 1135098,\n            name: \"7vH6zZTFdaIfWk9z5SxVIKtXCH2QLbe9n5vy.mp4\" },\n          { ... } ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "post",
    "url": "/4k/history/add",
    "title": "HistoryAdd(生成历史记录)",
    "version": "0.1.0",
    "name": "HistoryAdd________",
    "group": "Videos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>视频id,必填</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: \"success\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 501,\n  msg: \"err\",\n  data: {}\n}\n\n{\n  code: 508,\n  msg: \"token错误\",\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "Videos"
  },
  {
    "type": "",
    "url": "/",
    "title": "code码",
    "version": "0.1.0",
    "name": "code_",
    "group": "code",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  msg: 'success',\n  data: {}\n}\n{\n  code: 501,\n  msg: 'err',\n  data: {}\n}\n{\n  code: 502,\n  msg: '注册失败',\n  data: {}\n}\n{\n  code: 503,\n  msg: '验证码不存在',\n  data: {}\n}\n{\n  code: 504,\n  msg: '用户已存在',\n  data: {}\n}\n{\n  code: 505,\n  msg: '验证码错误',\n  data: {}\n}\n{\n  code: 506,\n  msg: '邮箱或手机号码错误',\n  data: {}\n}\n{\n  code: 507,\n  msg: '用户名或密码错误',\n  data: {}\n}\n{\n  code: 508,\n  msg: 'token错误',\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "d:/4K/routes/4k.js",
    "groupTitle": "code"
  }
] });
