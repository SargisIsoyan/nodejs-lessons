//1.Գրել ծրագիր, որը կստուգի , եթե req.url /sunny է, ապա console-ում տպի Yes.
const http = require('http');

http.createServer((request, response) => {
    if (request.url === '/sunny') {
        console.log('yes');
    }
    response.end();
}).listen(3000);
