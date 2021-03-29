const http = require('http');
const cors = require('cors');
const express = require('express');
const router = require('./router');

const app = express();
global.__homedir = __dirname;
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('port', 2021);
router(app);

const server = http.createServer(app);

server.listen(2021);
