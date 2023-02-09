const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost:9999",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "webchat"
});

module.exports = db

