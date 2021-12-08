const express = require("express");
const jwtMiddleware  = require('../../middlewares/jwt');

const login = require('./loginRoute');
const register = require('./registerRoute');

const router = express.Router();

router.use(jwtMiddleware);

router.post("/register", register);
router.post("/login", login)
router.get('/test_token', jwtMiddleware, (req, res) => res.send('Token is valid'));

module.exports = router;
