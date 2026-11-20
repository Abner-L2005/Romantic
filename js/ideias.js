/**
 * Arquivo: js/ideias.js
 * Módulo: Ideias
 * Dono: Unidade 2 (Catálogo e Ideia do Dia)
 * 
 * Contrato:
 * - Ideias.listar({ categoria, busca }): Ideia[]
 * - Ideias.obter(id: string): Ideia | null
 * - Ideias.categorias(): string[]
 * - Ideias.ideiaDoDia(data = new Date()): Ideia
 * 
 * Regras de Negócio e Requisitos:
 * - RF03: Ideia do Dia calculada deterministicamente a partir da data informada.
 * - RF04: Filtragem flexível por categoria e busca textual (título e descrição).
 */

const Ideias = {
  /**
   * Retorna lista de ideias com suporte a filtros combinados.
   * Cobre: RF04
   * @param {Object} filtros - { categoria?: string, busca?: string }
   * @returns {Array<Object>} Lista de ideias correspondentes
   */
  listar({ categoria = '', busca = '' } = {}) {
    // Esqueleto inicial: será implementado na Unidade 2
    throw new Error('Não implementado ainda (Unidade 2)');
  },

  /**
   * Retorna uma ideia específica por seu identificador.
   * @param {string} id 
   * @returns {Object|null}
   */
  obter(id) {
    // Esqueleto inicial: será implementado na Unidade 2
    const catalogo = window.DADOS_IDEIAS || [];
    return catalogo.find(item => item.id === id) || null;
  },

  /**
   * Retorna a lista de nomes únicos de categorias disponíveis no catálogo.
   * @returns {Array<string>}
   */
  categorias() {
    // Esqueleto inicial: será implementado na Unidade 2
    return ['Em casa', 'Ao ar livre', 'Românticas', 'Divertidas', 'Rápidas', 'Baixo custo'];
  },

  /**
   * Retorna a Ideia do Dia de forma determinística com base na data fornecida.
   * Cobre: RF03
   * @param {Date} data 
   * @returns {Object}
   */
  ideiaDoDia(data = new Date()) {
    // Esqueleto inicial: será implementado na Unidade 2
    throw new Error('Não implementado ainda (Unidade 2)');
  }
};

window.Ideias = Ideias;
