const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = async (username, email, password, password_confirmation) => {
  const errors = []
  try {  
    if (
      !username || !email || !password || !password_confirmation ||
      username.length === 0 ||  email.length === 0 || password.length === 0 || password_confirmation.length === 0
    ) 
      errors.push({msg: 'Los campos de usuario, email o contraseña son requeridos'});

    if (password !== password_confirmation)  
      errors.push({msg: 'Las contraseñas no coinciden'});

    if (password.length < 8) 
      errors.push({msg: 'La contraseña debe tener más de 8 caracteres'});
      
    const user = await User.findAll({
      where: {
        [Op.or]: [{username: username}, {email: email}],
      }
    });
    
    if (user.length > 0) 
      errors.push({msg: 'El email o el usuario ya estan siendo utlizadas'});

    return errors;
  } catch (error) {
    console.log(error);
  }
}