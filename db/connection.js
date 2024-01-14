// Importing and configuring dotenv to manage environment variables
require('dotenv').config();

// Importing the mysql2 package to interact with a MySQL database
const mysql = require('mysql2');

// Creating a database connection using mysql2
const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',           
  password: process.env.DB_PASSWORD, // Database password, retrieved from environment variables
  database: 'company_db'   
});

// Exporting the connection with promise support enabled for asynchronous operations
module.exports = connection.promise();
