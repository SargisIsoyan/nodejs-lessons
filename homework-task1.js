//1.  Ստեղծել homework իրադարձությունը լսող , որը կկանչի handler :
// handler-ը պետք է արտածի Homeworks.txt պարունակությունը: emit անել homework :
const {EventEmitter} = require('events');
const fs = require('fs').promises;

const homework = new EventEmitter();

homework.on('homework', async () => {
    const data = await fs.readFile('Homeworks.txt', 'utf-8');

    console.log(data);
});

module.exports = homework;
