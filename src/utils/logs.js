import db from '../server/db.js';

export async function registrarHistorico({ tabela, id_registro, acao, dados_antes, dados_depois, usuario }) {
  try {
    let camposModificados = {};

    if (acao === 'UPDATE' && dados_antes && dados_depois) {
      for (const chave in dados_depois) {
        if (dados_depois[chave] != dados_antes[chave]) {
          camposModificados[chave] = {
            de: dados_antes[chave],
            para: dados_depois[chave]
          };
        }
      }
    }

    await db.query(
      `INSERT INTO historico_alteracoes (tabela, id_registro, acao, dados_antes, dados_depois, usuario)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        tabela,
        id_registro,
        acao,
        acao === 'DELETE' ? JSON.stringify(dados_antes) : null,
        acao === 'CREATE' ? JSON.stringify(dados_depois)
          : acao === 'UPDATE' ? JSON.stringify(camposModificados)
          : null,
        usuario
      ]
    );
  } catch (error) {
    console.error('Erro ao registrar histórico:', error);
  }
}
