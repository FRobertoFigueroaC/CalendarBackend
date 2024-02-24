
const defaultLabel = 'This field';

const validationMessages = {
  required(label = defaultLabel) {
    return `${label} is required`
  },
  min(label = defaultLabel, min) {
    return `${label} must be at least ${min} chacarters`
  },
  max (label = defaultLabel, max) {
    return `${label} can not be longer than ${max} chacarters`
  },
  isDate (label = defaultLabel) {
    return `${label} must be a valid date`
  },
  email: 'Email format is not valid',
}

module.exports = {
  validationMessages
}