import express from 'express';
import { authenticateToken } from './authMiddleware.js';
import db from './db.js'; // Importa a configuração do banco de dados

const router = express.Router();

// Rota para cadastrar produtos
router.post('/produtos', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'gerente') {
    return res.status(403).json({ error: 'Permissão negada' });
  }

  const { nome, codigo_barras, categoria, quantidade, preco, fornecedor } = req.body;

  try {
    const query = `
      INSERT INTO produtos (nome, codigo_barras, categoria, quantidade, preco, fornecedor)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [nome, codigo_barras, categoria, quantidade, preco, fornecedor]);
    res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

// Rota para listar produtos
router.get('/produtos', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

export default router;