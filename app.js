const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('./config/config');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = mongoose.connect(`mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoDataBase}`, {
    useMongoClient: true,
    poolSize: 1
});
const mongoStore = require("connect-mongo")(session);
const fk = require('./routes/4k');

db.once("open", () => {
    console.log("db connect")
});

const store = new mongoStore({
    mongooseConnection: db,
    ttl: 7 * 24 * 60 * 60
});

const _session = session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8',
    store: store
});

const app = express();

app.use(logger('dev'));
app.use(_session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/4k', fk);

http.createServer(app).listen(config.serverPort, () => {
    console.log("http server started, listen on " + config.serverPort)
});