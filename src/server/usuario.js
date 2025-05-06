import express from 'express';
import db from './db.js'; // Importa a configuração do banco de dados

const router = express.Router();

// Rota para buscar os produtos
router.get('/produtos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota para cadastrar usuários
router.post('/usuarios', async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const query = `
      INSERT INTO usuarios (nome, email, senha, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [nome, email, senha, role || 'estoquista']); // Senha em texto puro
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Rota para autenticar usuários (removida a lógica de token)
router.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nome = ?', [nome]); // Busca pelo nome
    const user = rows[0];

    if (!user || senha !== user.senha) { // Comparação direta de senha
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

export default router;