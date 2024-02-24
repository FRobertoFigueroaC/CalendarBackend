const successfulMessages = {
  default200: 'Successful response',
  login200: 'Login succesfull',
  renewedToken: 'Token was renewd succesfully',
  created200(label = defaultLabel) {
    return `${label} was successfully created`
  },
  updated200(label = defaultLabel) {
    return `${label} was successfully updated`
  },
  deleted200(label = defaultLabel) {
    return `${label} was successfully updated`
  },

}

const errorMessages = {
  custom400: '',
  default400: 'Error 400 Bad request', 
  default404: 'Error 404 Not found', 
  default401: '401 Unauthorized',
  default500: 'Error 500 Internal Server Error ',
  defaultLoginError: 'Failing when trying to login.',
  fialedLoginAttempt: 'Email and password do not match with our registers',
  duplicatedEmail(email){
    return `This email: ${email} is already registered`
  },
  savingDBfailed(label) {
    return `Failing when trying to save ${label} in DB.`
  },
  deletingDBfailed(label) {
    return `Failing when trying to delete ${label} in DB.`
  },
  notFounded404(label, id) {
    return `Failing when trying to find ${label} with ${id} reference`
  },
  notAuthorized401: '401 Unauthorized',
}


module.exports = {
  successfulMessages,
  errorMessages
}