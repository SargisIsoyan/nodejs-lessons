//1. Գրել ծրագիր որ թույլ կտա վերբեռնել ֆայլ և պահպանել Homework պապկայի upload պապակայում ՝
// պահպանելիս ընտրել պատահական 6-անիշ թվերից կազմված անուն:
const express = require('express');
const random = require('random');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mime = require('mime-types');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'test/');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, random.int(1e5, 1e6) + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({dest: 'test/'});

router.post('/', upload.single('file'), (req, res) => {
    res.json(req.file);
});

router.get('/:name', upload.single('file'), (req, res) => {
    fs.createReadStream(path.join(__homedir, 'upload', req.params.name)).pipe(res);
});

module.exports = router;
