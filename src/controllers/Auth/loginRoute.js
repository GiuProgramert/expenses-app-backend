const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize');
const { JWT_SECRET } = require('../../config/getEnv');

module.exports = async (req, res) => {
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
      const { id, username } = user[0].dataValues;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        const token = jwt.sign(
          {
            id,
            username
          },
          JWT_SECRET,
          { expiresIn: 720 * 60 }
        )

        return res.json({ token }).status(200);
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
}