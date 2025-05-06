import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'boxty',
  port: 3306,
});

export default db;