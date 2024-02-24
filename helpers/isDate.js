const moment = require('moment');

const isDate = (value, {req, location, path}) => {
  if (!value)  return false; 
  // const date = moment(value, [
  //   "MM-DD-YYYY",
  //   "DD-MM-YYYY",
  //   "MM-DD-YY",
  //   "DD-MM-YY"
  // ]);
  const date = moment(value);
  return date.isValid();
}

module.exports = {
  isDate
}