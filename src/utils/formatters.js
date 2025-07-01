/**
 * Formata um CPF para o padrão XXX.XXX.XXX-XX
 * @param {string} value - O valor do CPF a ser formatado
 * @returns {string} CPF formatado
 */
export const formatCPF = (value) => {
    if (!value) return "";
    
    // Remove todos os caracteres não numéricos
    const cpfNumerico = value.replace(/\D/g, "");
    
    // Aplica a formatação XXX.XXX.XXX-XX
    return cpfNumerico
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };
  
  /**
   * Valida se um CPF está no formato correto
   * @param {string} cpf - O CPF a ser validado
   * @returns {boolean} Verdadeiro se o formato for válido
   */
  export const isValidCPFFormat = (cpf) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };
  

export function formatarValorEmReal(valor) {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(valor);
}

