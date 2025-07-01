import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'boxty',
  port: 3307,
});

export default db;