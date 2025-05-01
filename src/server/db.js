import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'boxty',
});

export default db;