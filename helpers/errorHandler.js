const { response } = require('express');

const { errorMessages } = require('../responses/responsesMessages');


const error500 = (res, error, msg) => {
  console.error(error)
  return res.status(500).json({
    ok: false,
    msg: msg || errorMessages.default500
  })
}
const error400 = (res, error, msg) => {
  console.error(error)
  return res.status(400).json({
    ok: false,
    msg: msg || errorMessages.default400
  })
}
const error404 = (res, error, msg) => {
  console.error(error)
  return res.status(404).json({
    ok: false,
    msg: msg || errorMessages.default404
  })
}
const error401 = (res, error, msg) => {
  console.error(error)
  return res.status(404).json({
    ok: false,
    msg: msg || errorMessages.default401
  })
}

const errorNotExistOrUnauthorized = (res, label, model, modelId, userId) => {
  if (!model) {
    return error404(res,`${label} not founded`, errorMessages.notFounded404(label, modelId));
  }
  if (model.user.toString() !== userId) {
    return error401(res,`not authorized ${label}`);
  }
}


module.exports = {
  error500,
  error400,
  error404,
  error401,
  errorNotExistOrUnauthorized
}