const http = require('http');
const cors = require('cors');
const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();
global.__homedir = __dirname;
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// SQL  MySQL , PostgreSQL , MsSQL , SQL lite
// nosql  MongoDB , Redis
app.set('port', 2021);
router(app);

const server = http.createServer(app);

mongoose.connect('mongodb://localhost/nodejs-lesson', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    server.listen(2021);
});
mongoose.set('useCreateIndex', true);

