//3. Server-ում ունենք users.json ֆայլ, որը զանգված է կազմված "fisrt_name", "last_name", "email", "age" դաշտեր պարունակող օբյեկտներից ։
// Ստեղծել սերվեր, որին հարցում ուղարկելիս եթե կա query-ի մեջ filter դաշտը , վերադարձնել users.json-ից զանգված միայն այն օբյեկներից ,
// որոնց "fisrt_name" կամ "last_name" պարունակում է filter-ի արժեքը։
const http = require('http');
const url = require('url');
const users = require('./users.json');

http.createServer((request, response) => {
    const urlData = url.parse(request.url, true);
    if (urlData.pathname === '/users') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify(users.filter(user => {
            return !urlData.query.filter || user.first_name.includes(urlData.query.filter) || user.last_name.includes(urlData.query.filter);
        })));
    } else {
        response.end();
    }
}).listen(3000);
