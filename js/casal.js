/**
 * Arquivo: js/casal.js
 * Módulo: Casal
 * Dono: Unidade 1 (Vínculo e Gestão do Casal)
 * 
 * Contrato:
 * - Casal.convidar(emailParceiro: string): Convite
 * - Casal.convitesRecebidos(): Convite[]
 * - Casal.aceitarConvite(conviteId: string): Casal
 * - Casal.recusarConvite(conviteId: string): void
 * - Casal.casalAtual(): Casal | null
 * - Casal.parceiro(): Usuario | null
 * 
 * Regras de Negócio e Requisitos:
 * - RN01: Exige usuário autenticado para operações de casal.
 * - RN02: Um usuário pertence a no máximo um casal; vínculo só ativa quando o parceiro aceita o convite.
 * - RN08: Não se pode convidar a si mesmo, nem alguém que já pertence a um casal.
 */

const Casal = {
  /**
   * Envia convite de vínculo para o e-mail do parceiro.
   * Cobre: RN01, RN02, RN08
   * @param {string} emailParceiro 
   * @returns {Object} Convite criado
   */
  convidar(emailParceiro) {
    // Esqueleto inicial: será implementado na Unidade 1
    throw new Error('Não implementado ainda (Unidade 1)');
  },

  /**
   * Retorna os convites pendentes recebidos pelo usuário atual.
   * Cobre: RN01
   * @returns {Array<Object>} Lista de convites pendentes
   */
  convitesRecebidos() {
    // Esqueleto inicial: será implementado na Unidade 1
    throw new Error('Não implementado ainda (Unidade 1)');
  },

  /**
   * Aceita um convite de vínculo recebido, formando o casal.
   * Cobre: RN01, RN02, RN08
   * @param {string} conviteId 
   * @returns {Object} Casal recém-formado
   */
  aceitarConvite(conviteId) {
    // Esqueleto inicial: será implementado na Unidade 1
    throw new Error('Não implementado ainda (Unidade 1)');
  },

  /**
   * Recusa um convite de vínculo recebido.
   * Cobre: RN01
   * @param {string} conviteId 
   */
  recusarConvite(conviteId) {
    // Esqueleto inicial: será implementado na Unidade 1
    throw new Error('Não implementado ainda (Unidade 1)');
  },

  /**
   * Retorna os dados do casal vinculado ao usuário atual, ou null.
   * Cobre: RN01, RN02
   * @returns {Object|null}
   */
  casalAtual() {
    // Esqueleto inicial: será implementado na Unidade 1
    const usuario = window.Auth ? window.Auth.usuarioAtual() : null;
    if (!usuario || !usuario.casalId) return null;
    const estado = window.Store.ler();
    return estado.casais.find(c => c.id === usuario.casalId) || null;
  },

  /**
   * Retorna os dados cadastrais do parceiro(a) do usuário atual, ou null.
   * Cobre: RN01, RN02
   * @returns {Object|null}
   */
  parceiro() {
    // Esqueleto inicial: será implementado na Unidade 1
    const casal = this.casalAtual();
    const usuario = window.Auth ? window.Auth.usuarioAtual() : null;
    if (!casal || !usuario) return null;
    const parceiroId = casal.usuarioIds.find(id => id !== usuario.id);
    if (!parceiroId) return null;
    const estado = window.Store.ler();
    return estado.usuarios.find(u => u.id === parceiroId) || null;
  }
};

window.Casal = Casal;
