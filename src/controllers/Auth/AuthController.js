const express = require("express");

const login = require('./loginRoute');
const register = require('./registerRoute');

const router = express.Router();

router.post("/register", register);
router.post("/login", login)

module.exports = router;
