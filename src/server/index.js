import express from 'express';
import produtosRouter from './produtos.js';
import usuariosRouter from './usuario.js';
import db from './db.js'; 

db.getConnection()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
  
const app = express();
const PORT = 5001;

app.use(express.json());

// Usar as rotas de produtos e usuários
app.use('/server/produtos', produtosRouter);
app.use('/server/usuarios', usuariosRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});