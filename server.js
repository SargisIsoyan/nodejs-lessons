const http = require('http');
const express = require('express');
const router = require('./router');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('port', 2021);
router(app);

const server = http.createServer(app);

server.listen(2021);
