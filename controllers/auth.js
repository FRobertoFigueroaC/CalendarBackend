const {response} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {

  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    if (user) {
      console.log('debe caer aca')
      return res.status(400).json({
        ok:  false,
        msg: `This email: ${email} is already registered`
      })
    }
    user = new User(req.body);
    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    // Generate JWT
    const token = await createJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      msg: 'User has been saved successfully',
      id: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Failing when trying to save user in DB.'
    })
  }
}
const loginUser = async (req, res = express.response) => {
  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email and password do not match with our registers.'
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Email and password do not match with our registers.'
      });
    }
    // Generate JWT
    const token = await createJWT(user.id, user.name);
    return res.status(200).json({
      ok: true,
      msg: 'login',
      id: user.id,
      name: user.name,
      token
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Failing when trying to login.'
    })
  }
}
const renewToken = async(req, res = express.response) => {
  // error handling
  const {id, name} = req

  // Generate JWT
  const token = await createJWT(id, name);

 res.status(200).json({
  ok: true,
  msg: 'renew',
  token, name
 })
}


module.exports = {
  createUser,
  loginUser,
  renewToken
}