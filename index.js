const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');


// Create express server
const app = express();

// Data base
dbConnection();

// CORS
app.use(cors())

// Public directory
app.use(express.static('public'));

// Read and parse the body 
app.use(express.json());
// Rutas
app.use('/api/auth', require('./routes/auth') );

// Listen request
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
})