const express = require('express');
const User    = require('../models/User'); 

const router = express.Router();

router.get('/register', async function(req, res) {
    try {
        const giu = await User.create({
            username: 'giu',
            email: 'giulidiazp@gmail.com',
            name: 'Giuliano',
            lastname: 'Diaz',
            password: '1234',
        });

        console.log(giu instanceof User); // true
        console.log(giu.name); // "Jane"
        return res.send('Connection has been established successfully.');
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

module.exports = router;