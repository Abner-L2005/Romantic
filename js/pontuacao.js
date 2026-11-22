// js/pontuacao.js
/**
 * Arquivo: js/pontuacao.js
 * Módulo: Pontuacao
 * Responsabilidade: Cálculo dinâmico e auditável de saldo de pontos, total acumulado,
 * ofensiva (streak diário) e registro da última conclusão do casal.
 * 
 * Contrato de Módulos (docs/SPEC.md):
 * - Pontuacao.total(): number (saldo atual disponível)
 * - Pontuacao.acumulado(): number (total bruto histórico)
 * - Pontuacao.ofensiva(dataHoje?: Date): number (sequência de dias consecutivos com conclusão)
 * - Pontuacao.ultimaConclusao(): Date | null (timestamp da atividade mais recente)
 * 
 * Regras de Negócio aplicadas:
 * - RN05 (Regra da Ofensiva e Pontuação):
 *   - Conclusão em dia consecutivo (+1 dia calendário): incrementa a ofensiva em +1.
 *   - Intervalo superior a 1 dia sem concluir: a ofensiva é reiniciada com o valor 1.
 *   - Múltiplas conclusões no mesmo dia somam os pontos de cada atividade, mas não aumentam a ofensiva além da primeira do dia.
 *   - Primeira conclusão histórica do casal fixa a ofensiva em 1.
 *   - Cálculo derivado dinamicamente a partir do histórico de desafios para garantir consistência.
 * - RN06 (Regra de Resgate de Recompensas e Saldo):
 *   - Saldo disponível = Soma(Pontos de desafios CONCLUIDO) - Soma(Custo de recompensas RESGATADA).
 */

(function (window) {
  'use strict';

  // Constante de milissegundos por dia para cálculos de calendário
  const MS_POR_DIA = 24 * 60 * 60 * 1000;

  /**
   * Converte uma data (Date ou string ISO) para o timestamp da meia-noite (00:00:00 local).
   * Garante comparações puras de dia civil sem influência de horário ou fuso.
   * @param {Date|string} data 
   * @returns {number} Timestamp em milissegundos da meia-noite local
   */
  function obterMeiaNoiteLocal(data) {
    const d = data instanceof Date ? data : new Date(data);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }

  /**
   * Identifica o casal vinculado ao usuário autenticado atual.
   * @returns {string|null} ID do casal ou null se não autenticado/sem casal
   */
  function obterCasalIdAtual() {
    const usuario = window.Auth && typeof window.Auth.usuarioAtual === 'function'
      ? window.Auth.usuarioAtual()
      : null;

    if (!usuario) {
      return null;
    }

    if (usuario.casalId) {
      return usuario.casalId;
    }

    const casal = window.Casal && typeof window.Casal.casalAtual === 'function'
      ? window.Casal.casalAtual()
      : null;

    return casal ? casal.id : null;
  }

  const Pontuacao = {
    /**
     * Retorna o saldo líquido atual de pontos disponível para resgates do casal.
     * Aplica RN06: Saldo = Σ(Pontos dos Desafios Concluídos) - Σ(Custo das Recompensas Resgatadas).
     * 
     * @returns {number} Saldo disponível (inteiro >= 0)
     */
    total() {
      // Aplica RN06
      const casalId = obterCasalIdAtual();
      if (!casalId) {
        return 0;
      }

      const estado = window.Store.ler();

      // Soma dos pontos conquistados em desafios com status "CONCLUIDO"
      const pontosGanhos = (estado.desafios || [])
        .filter(d => d.casalId === casalId && d.status === 'CONCLUIDO')
        .reduce((soma, d) => soma + (Math.round(Number(d.pontos)) || 0), 0);

      // Soma do custo de recompensas com status "RESGATADA"
      const pontosGastos = (estado.recompensas || [])
        .filter(r => r.casalId === casalId && r.status === 'RESGATADA')
        .reduce((soma, r) => soma + (Math.round(Number(r.custo)) || 0), 0);

      const saldo = pontosGanhos - pontosGastos;
      return Math.max(0, saldo);
    },

    /**
     * Retorna o total histórico acumulado bruto de pontos conquistados pelo casal.
     * @returns {number} Total acumulado (inteiro >= 0)
     */
    acumulado() {
      const casalId = obterCasalIdAtual();
      if (!casalId) {
        return 0;
      }

      const estado = window.Store.ler();

      return (estado.desafios || [])
        .filter(d => d.casalId === casalId && d.status === 'CONCLUIDO')
        .reduce((soma, d) => soma + (Math.round(Number(d.pontos)) || 0), 0);
    },

    /**
     * Calcula a sequência atual de dias consecutivos com conclusão válida (ofensiva/streak).
     * Aplica RN05: Calculada a partir do histórico de conclusões para evitar inconsistência de dados.
     * 
     * @param {Date|string} [dataHoje=new Date()] - Data de referência ("hoje") para facilitar testes automatizados
     * @returns {number} Número de dias seguidos de ofensiva (inteiro >= 0)
     */
    ofensiva(dataHoje = new Date()) {
      // Aplica RN05
      const casalId = obterCasalIdAtual();
      if (!casalId) {
        return 0;
      }

      const estado = window.Store.ler();

      // Filtra todos os desafios concluídos do casal com data de conclusão válida
      const concluidos = (estado.desafios || []).filter(
        d => d.casalId === casalId && d.status === 'CONCLUIDO' && d.concluidoEm
      );

      if (concluidos.length === 0) {
        return 0;
      }

      // Agrupa conclusões em dias calendário únicos (evita duplicidade no mesmo dia conforme RN05)
      const diasUnicosMap = new Map();
      for (const d of concluidos) {
        const dataConclusao = new Date(d.concluidoEm);
        if (isNaN(dataConclusao.getTime())) continue;

        const chaveDia = `${dataConclusao.getFullYear()}-${String(dataConclusao.getMonth() + 1).padStart(2, '0')}-${String(dataConclusao.getDate()).padStart(2, '0')}`;
        if (!diasUnicosMap.has(chaveDia)) {
          diasUnicosMap.set(chaveDia, obterMeiaNoiteLocal(dataConclusao));
        }
      }

      // Ordena cronologicamente os dias com conclusão
      const diasOrdenados = Array.from(diasUnicosMap.values()).sort((a, b) => a - b);
      if (diasOrdenados.length === 0) {
        return 0;
      }

      // Calcula a evolução histórica da sequência de conclusões
      // Primeira conclusão histórica fixa a ofensiva em 1 (RN05)
      let streak = 1;
      for (let i = 1; i < diasOrdenados.length; i++) {
        const diaAnterior = diasOrdenados[i - 1];
        const diaAtual = diasOrdenados[i];
        const diferencaDias = Math.round((diaAtual - diaAnterior) / MS_POR_DIA);

        if (diferencaDias === 1) {
          // Conclusão em dia consecutivo: incrementa +1 (RN05)
          streak += 1;
        } else if (diferencaDias > 1) {
          // Intervalo superior a 1 dia sem concluir: reinicia com o valor 1 (RN05)
          streak = 1;
        }
        // Se diferencaDias === 0, permanece o mesmo streak (mesmo dia calendário)
      }

      // Valida a ofensiva em relação à data atual informada ("hoje")
      if (dataHoje) {
        const refDate = dataHoje instanceof Date ? dataHoje : new Date(dataHoje);
        if (!isNaN(refDate.getTime())) {
          const meiaNoiteHoje = obterMeiaNoiteLocal(refDate);
          const ultimoDiaConcluido = diasOrdenados[diasOrdenados.length - 1];
          const diferencaParaHoje = Math.round((meiaNoiteHoje - ultimoDiaConcluido) / MS_POR_DIA);

          // Se o último dia de atividade foi hoje (0) ou ontem (1), a ofensiva permanece ativa.
          // Se já se passaram 2 ou mais dias sem atividades (diferencaParaHoje > 1), a sequência expirou.
          if (diferencaParaHoje > 1) {
            return 0;
          }
        }
      }

      return streak;
    },

    /**
     * Retorna o objeto Date da conclusão mais recente do casal atual, ou null se não houver.
     * @returns {Date|null}
     */
    ultimaConclusao() {
      const casalId = obterCasalIdAtual();
      if (!casalId) {
        return null;
      }

      const estado = window.Store.ler();
      const concluidos = (estado.desafios || []).filter(
        d => d.casalId === casalId && d.status === 'CONCLUIDO' && d.concluidoEm
      );

      if (concluidos.length === 0) {
        return null;
      }

      // Localiza a maior data de conclusão
      let dataMaisRecente = null;
      for (const d of concluidos) {
        const data = new Date(d.concluidoEm);
        if (!isNaN(data.getTime())) {
          if (!dataMaisRecente || data.getTime() > dataMaisRecente.getTime()) {
            dataMaisRecente = data;
          }
        }
      }

      return dataMaisRecente;
    }
  };

  // Exposição no escopo global
  window.Pontuacao = Pontuacao;

})(typeof window !== 'undefined' ? window : globalThis);
