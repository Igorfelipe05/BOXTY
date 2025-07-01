export function formatarHistoricoAlteracao(registro) {
  const { tabela, acao, dados_antes, dados_depois, usuario, data_alteracao } = registro;
  let mensagem = `[${new Date(data_alteracao).toLocaleString('pt-BR')}] Usuário ${usuario} `;

  if (acao === 'CREATE') {
    mensagem += `criou um novo registro na tabela '${tabela}': ${formatarCampos(dados_depois)}`;
  } else if (acao === 'UPDATE') {
    const modificacoes = formatarCampos(dados_depois, true);
    mensagem += `atualizou o registro da tabela '${tabela}': ${modificacoes}`;
  } else if (acao === 'DELETE') {
    mensagem += `removeu o registro da tabela '${tabela}': ${formatarCampos(dados_antes)}`;
  } else {
    mensagem += `(ação desconhecida)`;
  }

  return mensagem;
}


function formatarCampos(jsonString, mostrarAlteracoes = false) {
  if (!jsonString) return '(sem dados)';

  try {
    const dados = JSON.parse(jsonString);
    if (!dados || Object.keys(dados).length === 0) return '(sem dados)';

    if (mostrarAlteracoes) {
      return Object.entries(dados)
        .map(([campo, valor]) => `${campo}: de "${valor.de}" para "${valor.para}"`)
        .join(', ');
    } else {
      return Object.entries(dados)
        .map(([campo, valor]) => `${campo}: "${valor}"`)
        .join(', ');
    }
  } catch (e) {
    return '(dados inválidos)';
  }
}
