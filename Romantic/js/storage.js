/**
 * Arquivo: js/storage.js
 * Módulo: Store e RegraViolada
 * Responsabilidade: Gerenciamento centralizado de persistência em localStorage ("romantic:v1")
 * e definição da classe padrão para exceções de regras de negócio.
 * 
 * Contrato:
 * - RegraViolada: class(regra, mensagem) extends Error
 * - Store.ler(): RomanticStorageV1
 * - Store.salvar(estado): void
 * - Store.resetar(): RomanticStorageV1
 * - Store.novoId(): string
 */

/**
 * Exceção disparada quando uma regra de negócio do projeto é violada.
 * Possui atributos legíveis 'regra' (ex: 'RN01') e 'mensagem'.
 */
class RegraViolada extends Error {
  /**
   * @param {string} regra - Identificador da regra violada (ex: 'RN01', 'RN07')
   * @param {string} mensagem - Descrição clara do motivo da recusa
   */
  constructor(regra, mensagem) {
    super(`[${regra}] ${mensagem}`);
    this.name = 'RegraViolada';
    this.regra = regra;
    this.mensagem = mensagem;
  }
}

/**
 * Chave única de armazenamento do aplicativo no localStorage.
 */
const CHAVE_STORAGE_ROMANTIC = 'romantic:v1';

/**
 * Retorna uma cópia limpa da estrutura inicial do banco local.
 * @returns {Object} Estrutura padrão vazia
 */
function obterEstadoInicialPadrao() {
  return {
    usuarios: [],
    sessao: null,
    convites: [],
    casais: [],
    desafios: [],
    recompensas: []
  };
}

/**
 * Objeto global de persistência do Romantic.
 */
const Store = {
  /**
   * Lê o estado completo do storage local.
   * Se não existir ou for inválido, inicializa e salva a estrutura padrão.
   * @returns {Object} Estado íntegro do sistema
   */
  ler() {
    try {
      const conteudoBruto = localStorage.getItem(CHAVE_STORAGE_ROMANTIC);
      if (!conteudoBruto) {
        const novoEstado = obterEstadoInicialPadrao();
        this.salvar(novoEstado);
        return novoEstado;
      }

      const parsed = JSON.parse(conteudoBruto);
      if (!parsed || typeof parsed !== 'object') {
        const novoEstado = obterEstadoInicialPadrao();
        this.salvar(novoEstado);
        return novoEstado;
      }

      // Garante a existência de todas as coleções esperadas
      return {
        usuarios: Array.isArray(parsed.usuarios) ? parsed.usuarios : [],
        sessao: parsed.sessao && typeof parsed.sessao === 'object' ? parsed.sessao : null,
        convites: Array.isArray(parsed.convites) ? parsed.convites : [],
        casais: Array.isArray(parsed.casais) ? parsed.casais : [],
        desafios: Array.isArray(parsed.desafios) ? parsed.desafios : [],
        recompensas: Array.isArray(parsed.recompensas) ? parsed.recompensas : []
      };
    } catch (erro) {
      console.warn('Erro ao processar dados de romantic:v1 no localStorage. Reinicializando.', erro);
      const novoEstado = obterEstadoInicialPadrao();
      this.salvar(novoEstado);
      return novoEstado;
    }
  },

  /**
   * Grava o estado fornecido na chave única do localStorage.
   * @param {Object} estado - Objeto completo a ser persistido
   */
  salvar(estado) {
    if (!estado || typeof estado !== 'object') {
      throw new Error('Estado inválido fornecido para Store.salvar()');
    }
    try {
      const serializado = JSON.stringify(estado);
      localStorage.setItem(CHAVE_STORAGE_ROMANTIC, serializado);
    } catch (erro) {
      console.error('Falha crítica ao gravar no localStorage:', erro);
      throw erro;
    }
  },

  /**
   * Limpa os dados atuais e reinicializa o storage para o estado padrão vazio.
   * @returns {Object} Novo estado limpo
   */
  resetar() {
    const estadoLimpo = obterEstadoInicialPadrao();
    this.salvar(estadoLimpo);
    return estadoLimpo;
  },

  /**
   * Gera um identificador único alfanumérico (UUID v4 ou fallback criptográfico/timestamp).
   * @returns {string} ID único
   */
  novoId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    // Fallback resiliente caso randomUUID não esteja disponível
    return 'rmt_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
  }
};

// Exportação no escopo global do navegador
window.RegraViolada = RegraViolada;
window.Store = Store;
