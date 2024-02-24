
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { validationMessages } = require('./validationMessages');

const userFieldValidators = () => {

  return [
    check('name', validationMessages.required('Name')).not().isEmpty(),
    check('email', validationMessages.required('Email')).not().isEmpty(),
    check('email', validationMessages.email).isEmail(),
    check('password', validationMessages.required('Password')).not().isEmpty(),
    check('password', validationMessages.min('Password', 6)).isLength({min:6}),
    validateFields
  ]
}
const loginFieldValidators = () => {

  return [
    check('email', validationMessages.required('Email')).not().isEmpty(),
    check('email', validationMessages.email).isEmail(),
    check('password', validationMessages.required('Password')).not().isEmpty(),
    check('password', validationMessages.min('Password', 6)).isLength({min:6}),
    validateFields
  ]
}

module.exports = {
  userFieldValidators,
  loginFieldValidators
}