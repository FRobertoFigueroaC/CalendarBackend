const {response} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');
const { error400, error500 }  = require('../helpers/errorHandler');
const { successfulMessages, errorMessages } = require('../responses/responsesMessages');

const createUser = async (req, res = response) => {

  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    if (user) {
      return error400(res,'user not founded', errorMessages.duplicatedEmail);
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
      msg: successfulMessages.created200('User'),
      id: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    return error500(res, error, errorMessages.savingDBfailed('user'));
  }
}
const loginUser = async (req, res = express.response) => {
  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if (!user) {
      return error400(res,'user not founded', errorMessages.fialedLoginAttempt);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return error400(res,'invalid password', errorMessages.fialedLoginAttempt);
    }
    // Generate JWT
    const token = await createJWT(user.id, user.name);
    return res.status(200).json({
      ok: true,
      msg: successfulMessages.login200,
      id: user.id,
      name: user.name,
      token
    })
    
  } catch (error) {
    return error500(res, error, errorMessages.defaultLoginError);
  }
}
const renewToken = async(req, res = express.response) => {
  // error handling
  const {id, name} = req

  // Generate JWT
  const token = await createJWT(id, name);

 res.status(200).json({
  ok: true,
  msg: successfulMessages.renewedToken,
  token, id, name
 })
}


module.exports = {
  createUser,
  loginUser,
  renewToken
}