import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db.js'; // Importa a configuração do banco de dados

const router = express.Router();
const JWT_SECRET = 'seu_segredo_jwt'; // Use uma variável de ambiente em produção

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
    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = `
      INSERT INTO usuarios (nome, email, senha, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [nome, email, hashedPassword, role || 'estoquista']);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Rota para autenticar usuários
router.post('/login', async (req, res) => {
  const { nome, senha } = req.body; // Alterado de "email" para "nome"

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nome = ?', [nome]); // Busca pelo nome
    const user = rows[0];

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

export default router;