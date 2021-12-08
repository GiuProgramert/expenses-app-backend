const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const validateRegister = require('../helpers/validateRegister')
const { Op } = require('sequelize');

const saltRounds = 8;
const router = express.Router();

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
  let errors = [];
  const { username, password } = req.body;

  try{
    if (
      !username || !password ||
      username.length < 0 || password.length < 0 
    ) errors.push({ msg: 'Debe introducir el usuario y la contraseña' })

    const user = await User.findAll({
      where: {
        username: {
          [Op.eq]: username
        }
      }
    });
    if (user.length > 0) {
      const hashedPassword = user[0].dataValues.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        return res.json({ token: 'adsdadasd' }).status(200);
      }

      errors.push({ msg: 'el usuario o la contraseña estan mal' }) 
    } else {
      errors.push({ msg: 'el usuario o la contraseña estan mal' })
    }
    
    return res.json(errors).status(400);
  } catch (error) {
    console.log(error);
    return res.json(error).status(500);
  }
})

module.exports = router;
