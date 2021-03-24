//2.Server-ում ունենք sunny.txt ֆայլ: Ստեղծել սերվեր, որին հարցում ուղարկելիս եթե կա query-ի մեջ file դաշտը և այն հավասար է "sunny",
// որպես response ստանա sunny.txt պարունակությունը այլապես 404 status-ով ստանա "File Not Found". (Օգտագործել Get մեթոդը):
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => {
    const urlData = url.parse(request.url, true);
    if (urlData.query.file === 'sunny') {
        fs.createReadStream('./sunny.txt').pipe(response);
    } else {
        response.end();
    }
}).listen(3000);
