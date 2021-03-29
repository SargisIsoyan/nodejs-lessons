//Ունենք users.json ֆայլ , այն սկզբում պարունակում է դատարկ օբյեկտ․ Ոնենալ users route որի վրա կարելի է կատարել get և post request :
// post -ի body-ն պարունակելու է username, name, image դաշտերը։
// Post անելուց հետո users.json-ի պաունակությունը կարդալ ամբողյությամբ , հետո այդ json-ի մեջ ավելացնել username key-ով օբյեկ ,
// որի մեջ կա username, name և image (image-ը save արած image-ի path-ն է, multer-ի միջոցով save անել) , հետո
// փոխել json-ի պարունակությունը։ Նախքան ավելացնելը ստուգել եթե այս username-ով արդեն կա օբյեկ json ֆայլի մեջ ,
// ապա վերադարձնել res.json()-ի մեջ {success: false, data: null, message: 'username is taken'}}, հակարակ դեպքում
// վերադարձնել success-ը true , data-ն ավելացված օբյետը , իսկ message-ը "user created" :
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();
const upload = require('../middlewares/upload');

router.route('/').get(async (req, res) => {
    let users = Object.values(JSON.parse(await fs.readFile(__dirname + './../users.json', 'utf-8')));

    if (req.query.name) {
        users = users.filter(user => user.name.includes(req.query.name));
    }
    if (req.query.limit) {
        users = users.slice(0, req.query.limit);
    }

    res.json(users);
}).post(upload.single('image'), async (req, res) => {
    const {username, name} = req.body;
    const userData = JSON.parse(await fs.readFile(__dirname + './../users.json', 'utf-8'));

    if (userData[username]) {
        await fs.unlink(path.join(__homedir, req.file.path));
        res.status(400).json({
            success: false,
            data: null,
            message: 'user exists'
        });
    } else {
        userData[username] = {
            username,
            name,
            image: req.file.path
        }
        await fs.writeFile(__dirname + './../users.json', JSON.stringify(userData));
        res.json({
            success: true,
            data: userData[username],
            message: 'user created'
        });
    }
});

router.route('/:username').get(async (req, res) => {
    const usersData = JSON.parse(await fs.readFile(__dirname + './../users.json', 'utf-8'));

    res.json(usersData[req.params.username]);
}).put(upload.single('image'), async (req, res) => {
    const usersData = JSON.parse(await fs.readFile(__dirname + './../users.json', 'utf-8'));

    if (req.body.name) {
        usersData[req.params.username]['name'] = req.body.name;
    }
    if (req.file) {
        await fs.unlink(path.join(__homedir, usersData[req.params.username]['image']));
        usersData[req.params.username]['image'] = req.file.path;
    }
    await fs.writeFile(__dirname + './../users.json', JSON.stringify(usersData));

    res.json(usersData[req.params.username]);
}).delete(async (req, res) => {
    const usersData = JSON.parse(await fs.readFile(__dirname + './../users.json', 'utf-8'));
    delete usersData[req.params.username];
    await fs.writeFile(__dirname + './../users.json', JSON.stringify(usersData));
    res.json({
        success: true
    });
});

module.exports = router;
