import express from 'express';
import db from './db.js';

const router = express.Router();

// Rota para cadastrar produtos
router.post('/produtos', async (req, res) => {
  const { nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario } = req.body;

  try {
    const query = `
      INSERT INTO produtos (nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario]);
    res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

// Rota para listar produtos
router.get('/produtos', async (req, res) => {
  const usuarioId = req.query.id_usuario;
  try {
    let rows;
    if (usuarioId) {
      [rows] = await db.query('SELECT * FROM produtos WHERE id_usuario = ?', [usuarioId]);
    } else {
      [rows] = await db.query('SELECT * FROM produtos');
    }
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// 🔄 Rota para atualizar um produto
router.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario } = req.body;

  try {
    const query = `
      UPDATE produtos
      SET nome = ?, codigo_barras = ?, categoria = ?, quantidade = ?, preco = ?, fornecedor = ?, id_usuario = ?
      WHERE id = ?
    `;
    const [result] = await db.query(query, [nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// 🗑️ Rota para deletar um produto
router.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM produtos WHERE id = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
