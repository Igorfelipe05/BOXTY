import express from 'express';
import db from './db.js';
import { registrarHistorico } from '../utils/logs.js'; // Importa a função para registrar histórico
import { formatarHistoricoAlteracao } from '../utils/formatadorLogs.js';


const router = express.Router();

// ✅ Cadastrar produtos
router.post('/produtos', async (req, res) => {
  const { nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario } = req.body;

  try {
    const query = `
      INSERT INTO produtos (nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario]);

    // 🔹 Registrar histórico
    await registrarHistorico({
      tabela: 'produtos',
      id_registro: result.insertId,
      acao: 'CREATE',
      dados_antes: null,
      dados_depois: { nome, codigo_barras, categoria, quantidade, preco, fornecedor },
      usuario: id_usuario
    });

    res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

// ✅ Listar produtos
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

// ✅ Atualizar produto
router.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    const produtoAntes = rows[0];

    const query = `
      UPDATE produtos
      SET nome = ?, codigo_barras = ?, categoria = ?, quantidade = ?, preco = ?, fornecedor = ?, id_usuario = ?
      WHERE id = ?
    `;
    const [result] = await db.query(query, [nome, codigo_barras, categoria, quantidade, preco, fornecedor, id_usuario, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // 🔹 Registrar histórico
    await registrarHistorico({
      tabela: 'produtos',
      id_registro: id,
      acao: 'UPDATE',
      dados_antes: produtoAntes,
      dados_depois: { nome, codigo_barras, categoria, quantidade, preco, fornecedor },
      usuario: id_usuario
    });

    res.json({ message: 'Produto atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// ✅ Rota para exibir histórico de forma simples
router.get('/historico', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM historico_alteracoes ORDER BY data_alteracao DESC');
    const historicoFormatado = rows.map(formatarHistoricoAlteracao);
    res.json(historicoFormatado);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});


// ✅ Deletar produto
router.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    const produtoAntes = rows[0];

    const query = 'DELETE FROM produtos WHERE id = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // 🔹 Registrar histórico
    await registrarHistorico({
      tabela: 'produtos',
      id_registro: id,
      acao: 'DELETE',
      dados_antes: produtoAntes,
      dados_depois: null,
      usuario: produtoAntes.id_usuario
    });

    res.json({ message: 'Produto deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
