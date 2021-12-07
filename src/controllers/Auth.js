const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const validateRegister = require('../helpers/validateRegister')

const saltRounds = 8;
const router = express.Router();

router.get("/register", async function (req, res) {
  let user;
  
  try {
    const { username, email, name, lastname, password, password_confirmation } = req.body;
    const validateErrors = await validateRegister(username, email, password, password_confirmation);

    if (validateErrors.length > 0) return res.json(validateErrors).status(400);

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      user = await User.create({ username, email, name, lastname, password: hash });
      if (user) return res.send("Usuario creado").status(200);
    });
  } catch (error) {
    console.log(error);
    return res.json(error).status(500);
  }
});

module.exports = router;
