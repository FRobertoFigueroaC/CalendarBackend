
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');

const { validationMessages } = require('./validationMessages');

const eventFieldValidators = () => {

  return [
    check('title', validationMessages.required('Title')).not().isEmpty(),
    check('start', validationMessages.required('Start Date')).not().isEmpty(),
    check('start', validationMessages.isDate('Start Date')).custom(isDate),
    check('end', validationMessages.required('End Date')).not().isEmpty(),
    check('end', validationMessages.isDate('End Date')).custom(isDate),
    validateFields
  ]

}

module.exports = {
  eventFieldValidators
}