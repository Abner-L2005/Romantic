/**
 * Arquivo: js/desafios.js
 * Módulo: Desafios
 * Dono: Unidade 3 (Desafios e Gamificação)
 * 
 * Contrato:
 * - Desafios.aceitar(ideiaId: string): Desafio
 * - Desafios.concluir(desafioId: string, { foto, mensagem }): Desafio
 * - Desafios.listar(status?: "ACEITO" | "CONCLUIDO"): Desafio[]
 * - Desafios.obter(id: string): Desafio | null
 * 
 * Regras de Negócio e Requisitos:
 * - RN01: Exige usuário autenticado.
 * - RN03: Apenas membros do casal podem visualizar, aceitar ou concluir desafios do próprio casal.
 * - RN04: Um desafio só pode ser concluído uma única vez e só concede pontos uma vez.
 * - RF05: Registro opcional de memória com foto comprimida (base64 ≤ 300 KB) e/ou mensagem.
 */

const Desafios = {
  /**
   * Aceita uma ideia do catálogo e a transforma em desafio do casal.
   * Cobre: RN01, RN03, RF05
   * @param {string} ideiaId 
   * @returns {Object} Desafio criado com status "ACEITO"
   */
  aceitar(ideiaId) {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  },

  /**
   * Conclui um desafio ativo, registrando data, autor e memória opcional.
   * Cobre: RN01, RN03, RN04, RF05
   * @param {string} desafioId 
   * @param {Object} memoria - { foto?: string, mensagem?: string }
   * @returns {Object} Desafio atualizado com status "CONCLUIDO"
   */
  concluir(desafioId, { foto = null, mensagem = null } = {}) {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  },

  /**
   * Lista os desafios pertencentes exclusivamente ao casal do usuário autenticado.
   * Cobre: RN01, RN03
   * @param {string} [status] - "ACEITO" ou "CONCLUIDO"
   * @returns {Array<Object>} Lista de desafios do casal
   */
  listar(status) {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  },

  /**
   * Retorna um desafio pelo ID se pertencer ao casal atual.
   * Cobre: RN01, RN03
   * @param {string} id 
   * @returns {Object|null}
   */
  obter(id) {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  }
};

window.Desafios = Desafios;
