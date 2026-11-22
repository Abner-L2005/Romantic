// js/recompensas.js

/**
 * Módulo Recompensas - Gestão e resgate de recompensas do casal.
 * Aplica as regras de negócio RN01, RN02, RN03 e RN06 conforme docs/SPEC.md.
 */
(function (window) {
  "use strict";

  // Obtém a classe RegraViolada definida no storage.js ou fallback compatível com a SPEC
  const RegraViolada = window.RegraViolada || class extends Error {
    constructor(regra, mensagem) {
      super(`[${regra}] ${mensagem}`);
      this.name = "RegraViolada";
      this.regra = regra;
      this.mensagem = mensagem;
    }
  };

  const Recompensas = {
    /**
     * Cria uma nova recompensa personalizada para o casal atual.
     * Cobre: RN01, RN02, RN03
     * 
     * @param {Object} params Parâmetros da recompensa
     * @param {string} params.titulo Título da recompensa
     * @param {string} [params.descricao] Descrição dos detalhes
     * @param {number} params.custo Custo em pontos (> 0)
     * @returns {Object} Recompensa recém-criada
     */
    criar({ titulo, descricao = "", custo }) {
      // Aplica RN01: Apenas usuário logado pode criar recompensa
      const usuario = window.Auth ? window.Auth.usuarioAtual() : null;
      if (!usuario) {
        throw new RegraViolada("RN01", "Acesso restrito: usuário não autenticado.");
      }

      // Aplica RN02: O usuário deve estar em um casal ativo
      const casal = window.Casal ? window.Casal.casalAtual() : null;
      if (!casal) {
        throw new RegraViolada("RN02", "O usuário não possui um casal ativo para criar recompensas.");
      }

      // Aplica RN03: Isolamento de dados do casal
      if (usuario.casalId !== casal.id) {
        throw new RegraViolada("RN03", "Acesso não autorizado: dados incompatíveis com o casal.");
      }

      // Validação de campos de entrada
      if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
        throw new Error("O título da recompensa é obrigatório.");
      }

      const custoNum = Number(custo);
      if (isNaN(custoNum) || custoNum <= 0) {
        throw new Error("O custo da recompensa deve ser um número maior que zero.");
      }

      const estado = window.Store.ler();

      const novaRecompensa = {
        id: window.Store.novoId(),
        casalId: casal.id,
        titulo: titulo.trim(),
        descricao: descricao ? String(descricao).trim() : "",
        custo: Math.round(custoNum),
        status: "DISPONIVEL",
        criadoEm: new Date().toISOString(),
        resgatadaEm: null
      };

      if (!Array.isArray(estado.recompensas)) {
        estado.recompensas = [];
      }

      estado.recompensas.push(novaRecompensa);
      window.Store.salvar(estado);

      return novaRecompensa;
    },

    /**
     * Retorna todas as recompensas cadastradas pelo casal atual.
     * Cobre: RN01, RN02, RN03
     * 
     * @returns {Array<Object>} Lista de recompensas do casal
     */
    listar() {
      // Aplica RN01: Acesso restrito a usuários autenticados
      const usuario = window.Auth ? window.Auth.usuarioAtual() : null;
      if (!usuario) {
        throw new RegraViolada("RN01", "Acesso restrito: usuário não autenticado.");
      }

      // Aplica RN02: O usuário deve pertencer a um casal ativo
      const casal = window.Casal ? window.Casal.casalAtual() : null;
      if (!casal) {
        throw new RegraViolada("RN02", "O usuário não possui um casal ativo.");
      }

      // Aplica RN03: Isolamento de dados - retorna apenas as recompensas do casal atual
      const estado = window.Store.ler();
      return (estado.recompensas || []).filter(r => r.casalId === casal.id);
    },

    /**
     * Resgata uma recompensa do casal se houver saldo suficiente de pontos.
     * Cobre: RN01, RN02, RN03, RN06
     * 
     * @param {string} id Identificador único da recompensa
     * @returns {Object} Recompensa atualizada com status RESGATADA
     */
    resgatar(id) {
      // Aplica RN01: Acesso restrito a usuários autenticados
      const usuario = window.Auth ? window.Auth.usuarioAtual() : null;
      if (!usuario) {
        throw new RegraViolada("RN01", "Acesso restrito: usuário não autenticado.");
      }

      // Aplica RN02: Casal deve estar ativo
      const casal = window.Casal ? window.Casal.casalAtual() : null;
      if (!casal) {
        throw new RegraViolada("RN02", "O usuário não possui um casal ativo.");
      }

      const estado = window.Store.ler();
      const recompensa = (estado.recompensas || []).find(r => r.id === id);

      if (!recompensa) {
        throw new Error("Recompensa não encontrada.");
      }

      // Aplica RN03: Isolamento de dados do casal (impede resgatar recompensa de outro casal)
      if (recompensa.casalId !== casal.id) {
        throw new RegraViolada("RN03", "Acesso não autorizado: esta recompensa pertence a outro casal.");
      }

      // Validação de unicidade de resgate
      if (recompensa.status === "RESGATADA") {
        throw new RegraViolada("RN06", "Esta recompensa já foi resgatada.");
      }

      // Aplica RN06: Regra de Resgate de Recompensas
      // Saldo = Soma(Pontos das Atividades Concluídas) - Soma(Custo das Recompensas Resgatadas)
      let saldoAtual = 0;
      if (window.Pontuacao && typeof window.Pontuacao.total === "function") {
        saldoAtual = window.Pontuacao.total();
      } else {
        // Cálculo direto a partir do Store como garantia de conformidade com a fórmula da RN06
        const pontosGanhos = (estado.desafios || [])
          .filter(d => d.casalId === casal.id && d.status === "CONCLUIDO")
          .reduce((acc, d) => acc + (Number(d.pontos) || 0), 0);
        const pontosGastos = (estado.recompensas || [])
          .filter(r => r.casalId === casal.id && r.status === "RESGATADA")
          .reduce((acc, r) => acc + (Number(r.custo) || 0), 0);
        saldoAtual = pontosGanhos - pontosGastos;
      }

      if (saldoAtual < recompensa.custo) {
        throw new RegraViolada(
          "RN06",
          `Saldo insuficiente para resgatar. Saldo disponível: ${saldoAtual} pts. Custo necessário: ${recompensa.custo} pts.`
        );
      }

      // Debita o custo alterando o status para "RESGATADA" e marcando o timestamp UTC
      recompensa.status = "RESGATADA";
      recompensa.resgatadaEm = new Date().toISOString();

      window.Store.salvar(estado);

      return recompensa;
    }
  };

  // Expõe no escopo global
  window.Recompensas = Recompensas;

})(typeof window !== "undefined" ? window : globalThis);
