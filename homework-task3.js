//3.Գրել ծրագիր, որը կկարդա homework3.txt ֆայլի պարունակությունը, տեքստից կհեռացնի  ստորակետները
// և կգրի replace.txt ֆայլում, որից հետո ջնջել homework3.txt ֆայլը:
const fs = require('fs');
const {Transform} = require('stream');

async function removeCommasWithStream() {
    const readStream = fs.createReadStream('./homework3.txt');
    const writeStream = fs.createWriteStream('./replace.txt');

    const transform = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().replace(/\,/g, ''));
            callback();
        }
    });

    readStream.pipe(transform).pipe(writeStream);

    readStream.on('end', () => {

    }).on('error', (err) => {
        console.log(err);
    }).on('data', (chunk)=>{
        console.log(chunk.toString());
    });

    writeStream.on('finish', () => {
        fs.unlink('./homework3.txt', (err) => {

        });
    });
}

async function removeCommas() {
    const data = await fs.promises.readFile('./homework3.txt');
    await fs.promises.writeFile('./replace.txt', data.toString().replace(/\,/g, ''));
    await fs.promises.unlink('./homework3.txt');
}

removeCommasWithStream().then().catch((err) => {
    console.error(err)
});
