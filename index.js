const fs = require('fs');
const {EventEmitter} = require('events');

const read = fs.createReadStream('sunny.txt').on('data', (chunk) => {
    console.log('log1', chunk.toString());
}).on('data', ()=>{
    console.log('log2');
});
read.emit('data', 'test');

const event = new EventEmitter();

event.on('click', (number) => {
    console.log('click 1', number);
}).on('click', (number) => {
    console.log('click 2', number);
});

event.emit('click', 10);
