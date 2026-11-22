// js/desafios.js
/**
 * Arquivo: js/desafios.js
 * Módulo: Desafios
 * Responsabilidade: Gerenciamento do ciclo de vida dos desafios do casal (aceitar, listar, obter e concluir).
 * 
 * Contrato de Módulos (docs/SPEC.md):
 * - Desafios.aceitar(ideiaId: string): Desafio
 * - Desafios.concluir(desafioId: string, { foto, mensagem }): Desafio
 * - Desafios.listar(status?: "ACEITO" | "CONCLUIDO"): Desafio[]
 * - Desafios.obter(id: string): Desafio | null
 * 
 * Regras de Negócio aplicadas:
 * - RN01: Acesso restrito a usuários autenticados.
 * - RN03: Isolamento de dados do casal (apenas os parceiros do próprio casal podem ver, aceitar ou concluir).
 * - RN03 (Restrição): Não duplicar desafio com status "ACEITO" da mesma ideia para o mesmo casal.
 * - RN04: Unicidade de conclusão (desafio só é concluído uma única vez e só pontua uma vez).
 * - RF05: Registro opcional de memória afetiva (mensagem e foto em base64 <= 300 KB).
 */

(function (window) {
  'use strict';

  // Obtém a classe RegraViolada global (definida em js/storage.js)
  const RegraViolada = window.RegraViolada || class extends Error {
    constructor(regra, mensagem) {
      super(`[${regra}] ${mensagem}`);
      this.name = 'RegraViolada';
      this.regra = regra;
      this.mensagem = mensagem;
    }
  };

  /**
   * Função auxiliar para obter o usuário autenticado atual.
   * Aplica RN01: Valida se há usuário com sessão ativa.
   * @returns {Object} Usuário autenticado
   */
  function obterUsuarioAutenticado() {
    const usuario = window.Auth && typeof window.Auth.usuarioAtual === 'function'
      ? window.Auth.usuarioAtual()
      : null;

    if (!usuario) {
      // Aplica RN01
      throw new RegraViolada('RN01', 'Acesso restrito: usuário não autenticado.');
    }
    return usuario;
  }

  /**
   * Função auxiliar para obter o ID do casal vinculado ao usuário autenticado.
   * Aplica RN03: Garante vínculo com casal para operações de desafio.
   * @param {Object} usuario 
   * @returns {string} Identificador do casal
   */
  function obterCasalId(usuario) {
    if (usuario.casalId) {
      return usuario.casalId;
    }
    const casal = window.Casal && typeof window.Casal.casalAtual === 'function'
      ? window.Casal.casalAtual()
      : null;

    if (casal && casal.id) {
      return casal.id;
    }

    // Aplica RN03: Usuário sem casal não pode gerenciar desafios
    throw new RegraViolada('RN03', 'O usuário não possui um casal ativo para gerenciar desafios.');
  }

  const Desafios = {
    /**
     * Aceita uma ideia do catálogo e a transforma em um desafio ativo para o casal.
     * Cobre: RN01, RN03, RF05
     * Aceita parâmetros opcionais de título e pontos para flexibilidade em testes e integrações.
     * 
     * @param {string} ideiaId - ID de referência da ideia (ex: "ideia-01")
     * @param {string} [tituloCustom] - Título alternativo opcional
     * @param {number} [pontosCustom] - Pontos alternativos opcionais
     * @returns {Object} Desafio criado com status "ACEITO"
     */
    aceitar(ideiaId, tituloCustom, pontosCustom) {
      // Aplica RN01: Valida autenticação
      const usuario = obterUsuarioAutenticado();

      // Aplica RN03: Valida vínculo de casal ativo
      const casalId = obterCasalId(usuario);

      if (!ideiaId || typeof ideiaId !== 'string') {
        throw new Error('O identificador da ideia (ideiaId) é obrigatório.');
      }

      const estado = window.Store.ler();
      if (!Array.isArray(estado.desafios)) {
        estado.desafios = [];
      }

      // Aplica RN03: Impede duplicar desafio em andamento (status "ACEITO") para a mesma ideia no casal
      const desafioEmAndamento = estado.desafios.find(
        d => d.casalId === casalId && d.ideiaId === ideiaId && d.status === 'ACEITO'
      );
      if (desafioEmAndamento) {
        throw new RegraViolada('RN03', 'Já existe um desafio em andamento para esta ideia no seu casal.');
      }

      // Busca informações da ideia no catálogo em memória se disponível
      let dadosIdeia = null;
      if (window.Ideias && typeof window.Ideias.obter === 'function') {
        dadosIdeia = window.Ideias.obter(ideiaId);
      } else if (Array.isArray(window.DADOS_IDEIAS)) {
        dadosIdeia = window.DADOS_IDEIAS.find(item => item.id === ideiaId);
      }

      const tituloFinal = tituloCustom || (dadosIdeia ? dadosIdeia.titulo : `Desafio (${ideiaId})`);
      const pontosFinal = (typeof pontosCustom === 'number' && !isNaN(pontosCustom))
        ? pontosCustom
        : (dadosIdeia && typeof dadosIdeia.pontos === 'number' ? dadosIdeia.pontos : 50);

      // Constrói o novo registro conforme contrato do modelo de dados da SPEC (seção 6.1)
      const novoDesafio = {
        id: window.Store.novoId(),
        casalId: casalId,
        ideiaId: ideiaId,
        titulo: String(tituloFinal).trim(),
        pontos: Math.max(0, Math.round(Number(pontosFinal) || 50)),
        status: 'ACEITO',
        criadoPorId: usuario.id,
        criadoEm: new Date().toISOString(),
        concluidoEm: null,
        concluidoPorId: null,
        memoria: null
      };

      estado.desafios.push(novoDesafio);
      window.Store.salvar(estado);

      return novoDesafio;
    },

    /**
     * Conclui um desafio ativo, registrando data, executor e memória afetiva (foto e/ou mensagem).
     * Cobre: RN01, RN03, RN04, RF05
     * 
     * @param {string} desafioId - Identificador único do desafio
     * @param {Object} [dadosMemoria={}] - Dados opcionais da memória
     * @param {string|null} [dadosMemoria.foto=null] - Foto codificada em base64 (<= 300 KB)
     * @param {string|null} [dadosMemoria.mensagem=null] - Texto reflexivo ou declaração de amor
     * @returns {Object} Desafio atualizado com status "CONCLUIDO"
     */
    concluir(desafioId, { foto = null, mensagem = null } = {}) {
      // Aplica RN01: Valida autenticação
      const usuario = obterUsuarioAutenticado();

      // Aplica RN03: Valida vínculo de casal ativo
      const casalId = obterCasalId(usuario);

      if (!desafioId || typeof desafioId !== 'string') {
        throw new Error('O identificador do desafio (desafioId) é obrigatório.');
      }

      const estado = window.Store.ler();
      const desafio = (estado.desafios || []).find(d => d.id === desafioId);

      if (!desafio) {
        throw new Error('Desafio não encontrado.');
      }

      // Aplica RN03: Isolamento de dados do casal (impede concluir desafio pertencente a outro casal)
      if (desafio.casalId !== casalId) {
        throw new RegraViolada('RN03', 'Acesso não autorizado: este desafio pertence a outro casal.');
      }

      // Aplica RN04: Unicidade de conclusão (rejeita se já estiver concluído)
      if (desafio.status === 'CONCLUIDO') {
        throw new RegraViolada('RN04', 'Este desafio já foi concluído anteriormente.');
      }

      // Validação do tamanho da foto (base64 <= 300 KB) conforme RF05
      let fotoValidada = null;
      if (foto && typeof foto === 'string' && foto.trim()) {
        const fotoStr = foto.trim();
        // Estima o tamanho em bytes a partir da string base64
        const partesBase64 = fotoStr.split(',');
        const conteudoBruto = partesBase64[1] || partesBase64[0];
        const bytesAproximados = Math.round((conteudoBruto.length * 3) / 4);

        // Limite estrito de 300 KB (300 * 1024 = 307.200 bytes)
        const limiteMaximoBytes = 300 * 1024;
        if (bytesAproximados > limiteMaximoBytes) {
          throw new Error('A imagem selecionada excede o limite máximo permitido de 300 KB.');
        }
        fotoValidada = fotoStr;
      }

      let mensagemValidada = null;
      if (mensagem && typeof mensagem === 'string' && mensagem.trim()) {
        mensagemValidada = mensagem.trim();
      }

      // Registra a memória afetiva se ao menos um dos campos tiver sido preenchido
      const memoriaFinal = (fotoValidada || mensagemValidada)
        ? {
            foto: fotoValidada,
            mensagem: mensagemValidada
          }
        : null;

      // Atualiza o desafio no banco local (persiste conclusão e aciona pontuação/ofensiva)
      desafio.status = 'CONCLUIDO';
      desafio.concluidoEm = new Date().toISOString();
      desafio.concluidoPorId = usuario.id;
      desafio.memoria = memoriaFinal;

      window.Store.salvar(estado);

      return desafio;
    },

    /**
     * Lista todos os desafios pertencentes exclusivamente ao casal do usuário autenticado.
     * Cobre: RN01, RN03
     * 
     * @param {string} [status] - Filtro opcional por status: "ACEITO" ou "CONCLUIDO"
     * @returns {Array<Object>} Lista de desafios do casal
     */
    listar(status) {
      // Aplica RN01: Valida autenticação
      const usuario = obterUsuarioAutenticado();

      // Aplica RN03: Se não tem casal vinculado ainda, retorna lista vazia
      if (!usuario.casalId) {
        const casal = window.Casal && typeof window.Casal.casalAtual === 'function'
          ? window.Casal.casalAtual()
          : null;
        if (!casal) {
          return [];
        }
      }

      const casalId = usuario.casalId || (window.Casal && window.Casal.casalAtual() ? window.Casal.casalAtual().id : null);
      if (!casalId) {
        return [];
      }

      const estado = window.Store.ler();
      // Aplica RN03: Filtra estritamente os desafios do casal
      let lista = (estado.desafios || []).filter(d => d.casalId === casalId);

      if (status && (status === 'ACEITO' || status === 'CONCLUIDO')) {
        lista = lista.filter(d => d.status === status);
      }

      return lista;
    },

    /**
     * Localiza e retorna um desafio por seu identificador único.
     * Cobre: RN01, RN03
     * 
     * @param {string} id - Identificador do desafio
     * @returns {Object|null} Desafio localizado ou null se inexistente
     */
    obter(id) {
      // Aplica RN01: Valida autenticação
      const usuario = obterUsuarioAutenticado();

      if (!id || typeof id !== 'string') {
        return null;
      }

      const estado = window.Store.ler();
      const desafio = (estado.desafios || []).find(d => d.id === id);

      if (!desafio) {
        return null;
      }

      // Aplica RN03: Se pertencer a outro casal, nega o acesso
      const casalId = usuario.casalId || (window.Casal && window.Casal.casalAtual() ? window.Casal.casalAtual().id : null);
      if (casalId && desafio.casalId !== casalId) {
        throw new RegraViolada('RN03', 'Acesso não autorizado: este desafio pertence a outro casal.');
      }

      return desafio;
    }
  };

  // Exposição no escopo global conforme a arquitetura de scripts clássicos
  window.Desafios = Desafios;

})(typeof window !== 'undefined' ? window : globalThis);
