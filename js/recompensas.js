/**
 * Arquivo: js/recompensas.js
 * Módulo: Recompensas
 * Dono: Unidade 4 (Recompensas e Economia de Pontos)
 * 
 * Contrato:
 * - Recompensas.criar({ titulo, descricao, custo }): Recompensa
 * - Recompensas.listar(): Recompensa[]
 * - Recompensas.resgatar(id: string): Recompensa
 * 
 * Regras de Negócio e Requisitos:
 * - RN01: Exige usuário autenticado.
 * - RN03: Recompensas pertencem exclusivamente ao casal criador.
 * - RN06: Resgate permitido somente se saldo de pontos >= custo; debita o saldo após resgate.
 * - RF07: Criar, listar e resgatar recompensas personalizadas.
 */

const Recompensas = {
  /**
   * Cria uma nova recompensa personalizada para o casal.
   * Cobre: RN01, RN03, RF07
   * @param {Object} dados - { titulo, descricao, custo }
   * @returns {Object} Recompensa cadastrada
   */
  criar({ titulo, descricao, custo }) {
    // Esqueleto inicial: será implementado na Unidade 4
    throw new Error('Não implementado ainda (Unidade 4)');
  },

  /**
   * Lista todas as recompensas pertencentes ao casal autenticado.
   * Cobre: RN01, RN03, RF07
   * @returns {Array<Object>} Lista de recompensas
   */
  listar() {
    // Esqueleto inicial: será implementado na Unidade 4
    throw new Error('Não implementado ainda (Unidade 4)');
  },

  /**
   * Resgata uma recompensa específica, debitando os pontos do casal.
   * Cobre: RN01, RN03, RN06, RF07
   * @param {string} id 
   * @returns {Object} Recompensa resgatada
   */
  resgatada(id) {
    return this.resgatar(id);
  },

  /**
   * Resgata uma recompensa específica, debitando os pontos do casal.
   * Cobre: RN01, RN03, RN06, RF07
   * @param {string} id 
   * @returns {Object} Recompensa resgatada
   */
  resgatar(id) {
    // Esqueleto inicial: será implementado na Unidade 4
    throw new Error('Não implementado ainda (Unidade 4)');
  }
};

window.Recompensas = Recompensas;
