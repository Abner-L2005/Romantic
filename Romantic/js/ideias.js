// js/ideias.js
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
 * - RF03: Ideia do Dia calculada deterministicamente a partir da data calendário.
 * - RF04: Filtragem flexível de ideias por categoria e por busca textual (título e descrição).
 */

const Ideias = {
  /**
   * Retorna a lista de categorias disponíveis no catálogo.
   * @returns {string[]} Lista de categorias padronizadas
   */
  categorias() {
    return [
      'Em casa',
      'Ao ar livre',
      'Românticas',
      'Divertidas',
      'Rápidas',
      'Baixo custo'
    ];
  },

  /**
   * Retorna uma lista de ideias com suporte a filtros combinados de categoria e busca textual.
   * Cobre: RF04
   * @param {Object} [filtros={}] - Critérios de filtro
   * @param {string} [filtros.categoria] - Nome da categoria ou vazio para todas
   * @param {string} [filtros.busca] - Termo de busca textual
   * @returns {Array<Object>} Lista de ideias correspondentes
   */
  listar({ categoria = '', busca = '' } = {}) {
    const catalogo = window.DADOS_IDEIAS || [];
    const termoBusca = (busca || '').trim().toLowerCase();
    const categoriaFiltro = (categoria || '').trim();

    return catalogo.filter(item => {
      // Filtro por categoria (se informado e diferente de "Todas")
      const atendeCategoria = !categoriaFiltro || categoriaFiltro === 'Todas'
        ? true
        : item.categoria === categoriaFiltro;

      // Filtro por termo de busca no título ou descrição
      const atendeBusca = !termoBusca
        ? true
        : item.titulo.toLowerCase().includes(termoBusca) ||
          item.descricao.toLowerCase().includes(termoBusca);

      return atendeCategoria && atendeBusca;
    });
  },

  /**
   * Retorna uma ideia específica por seu identificador único.
   * @param {string} id - Identificador da ideia (ex: "ideia-01")
   * @returns {Object|null} Objeto da ideia ou null se não encontrada
   */
  obter(id) {
    if (!id) return null;
    const catalogo = window.DADOS_IDEIAS || [];
    return catalogo.find(item => item.id === id) || null;
  },

  /**
   * Retorna a Ideia do Dia de forma determinística baseada na data informada.
   * Cobre: RF03
   * @param {Date} [data=new Date()] - Data civil de referência
   * @returns {Object} Objeto da ideia selecionada para o dia
   */
  ideiaDoDia(data = new Date()) {
    const catalogo = window.DADOS_IDEIAS || [];
    if (!catalogo || catalogo.length === 0) {
      throw new Error('Catálogo de ideias não carregado.');
    }

    // Cria datas normalizadas em UTC para garantir estabilidade em qualquer fuso horário
    const dataRef = new Date(Date.UTC(2026, 0, 1));
    const dataAlvo = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()));

    const diferencaMs = dataAlvo.getTime() - dataRef.getTime();
    const diasDecorridos = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    const totalIdeias = catalogo.length;

    // Garante índice circular positivo mesmo com datas passadas
    const indice = ((diasDecorridos % totalIdeias) + totalIdeias) % totalIdeias;
    return catalogo[indice];
  }
};

// Exporta para o escopo global do navegador
window.Ideias = Ideias;
