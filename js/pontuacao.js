/**
 * Arquivo: js/pontuacao.js
 * Módulo: Pontuacao
 * Dono: Unidade 3 (Pontuação e Ofensiva)
 * 
 * Contrato:
 * - Pontuacao.total(): number (saldo atual disponível)
 * - Pontuacao.acumulado(): number (total bruto histórico)
 * - Pontuacao.ofensiva(): number (dias seguidos com conclusão)
 * - Pontuacao.ultimaConclusao(): Date | null
 * 
 * Regras de Negócio e Requisitos:
 * - RN05: Cálculo de ofensiva. Concluir em dia consecutivo: +1; mais de um dia sem concluir: reinicia em 1;
 *         múltiplas conclusões no mesmo dia não aumentam a ofensiva além da primeira.
 * - RN06: Saldo de pontos = soma dos pontos das atividades concluídas - soma dos custos de recompensas resgatadas.
 * - RF06: Apresentação de saldo e ofensiva do casal.
 */

const Pontuacao = {
  /**
   * Retorna o saldo líquido atual de pontos disponível para resgates.
   * Cobre: RN06
   * @returns {number}
   */
  total() {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  },

  /**
   * Retorna o total acumulado bruto de pontos conquistados na história do casal.
   * @returns {number}
   */
  acumulado() {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  },

  /**
   * Calcula a sequência atual de dias consecutivos com conclusão válida (ofensiva/streak).
   * Cobre: RN05
   * @returns {number} Número de dias seguidos (inteiro >= 0)
   */
  ofensiva() {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  },

  /**
   * Retorna o objeto Date da conclusão mais recente do casal, ou null.
   * @returns {Date|null}
   */
  ultimaConclusao() {
    // Esqueleto inicial: será implementado na Unidade 3
    throw new Error('Não implementado ainda (Unidade 3)');
  }
};

window.Pontuacao = Pontuacao;
