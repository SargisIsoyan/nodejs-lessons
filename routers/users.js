const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.end('users data');
});

router.post('/', (req, res) => {
    res.end('users add');
});

router.put('/', (req, res) => {
    res.end('users update');
});

router.delete('/', (req, res) => {
    res.end('users delete');
});

module.exports = router;
