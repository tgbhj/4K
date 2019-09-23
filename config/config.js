const env = process.env;

module.exports = {
    serverPort: env.serverPort || 80,

    mongoHost: env.mongoHost || '127.0.0.1',
    mongoDataBase: env.mongoDataBase || 'test',
    mongoPort: env.mongoPort || 27017,

    debug: env.debug || true,
    count: env.count || 3,
    status: env.status || 'ready',
    reCmd: env.reCmd || 1,
    videoPath: env.videoPath || './public/video/',
    apkPath: env.apkPath || './public/fkapk/'
};

