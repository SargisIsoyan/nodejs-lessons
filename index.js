const http = require('http');
const url = require('url');
const fs = require('fs');


const server = http.createServer((req, res) => {
    // console.log(req.method);
    // for (let key in req.headers) {
    //     console.log("headers key:value  is  " + key + ":" + req.headers[key]);
    // }
    //
    // res.statusCode = 403;
    // const urlData = url.parse(req.url, {parseQueryString: true});
    // console.log(urlData.query.user);
    // process.stdin.on('data', (chunk) => {
    //     res.write(chunk);
    // }).on('end', () => {
    //     res.end();
    // });
    // res.end(new Date().getSeconds().toString());
    fs.createReadStream('./image.jpg', {highWaterMark: 10}).on('data', (chunk) => {
        res.write(chunk);
    }).on('end', () => {
        res.write(null); // res.end()
    })
});


server.listen(2021);
