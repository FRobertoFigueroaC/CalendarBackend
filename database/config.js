const mongoose = require('mongoose');
require('dotenv').config();

const DB_CNN = process.env.DB_CNN;
const DB_NAME = process.env.DB_NAME;

const dbConnection = async() => {

  try {
    await mongoose.connect(`${DB_CNN}${DB_NAME}`);

    console.log('DB connection was successful');

  } catch (error) {
    console.log(error);
    throw new Error('Failing when trying to connect to DB');
  }
 
}

module.exports = {
  dbConnection
}