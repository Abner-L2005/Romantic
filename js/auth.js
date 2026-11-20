/**
 * Arquivo: js/auth.js
 * Módulo: Auth
 * Dono: Unidade 1 (Autenticação e Sessão)
 * 
 * Contrato:
 * - async Auth.cadastrar({ nome, email, senha, dataNascimento }): Promise<Usuario>
 * - async Auth.login(email, senha): Promise<Usuario>
 * - Auth.logout(): void
 * - Auth.usuarioAtual(): Usuario | null
 * - Auth.exigirLogin(caminhoLogin = "login.html"): Usuario
 * 
 * Regras de Negócio e Requisitos:
 * - RN01: Redireciona usuários anônimos ao acessar páginas protegidas.
 * - RN07: Validação de e-mail único, formato sintático válido e senha com mínimo de 6 caracteres.
 * - RNF04: Senhas nunca salvas em texto puro; hashing criptográfico SHA-256 via crypto.subtle.
 */

const Auth = {
  /**
   * Realiza o cadastro de um novo usuário.
   * Valida RN07 e RNF04.
   * @param {Object} dados - { nome, email, senha, dataNascimento }
   * @returns {Promise<Object>} Usuário cadastrado
   */
  async cadastrar({ nome, email, senha, dataNascimento }) {
    // Esqueleto inicial: será implementado na Unidade 1
    throw new Error('Não implementado ainda (Unidade 1)');
  },

  /**
   * Autentica um usuário existente com e-mail e senha.
   * @param {string} email 
   * @param {string} senha 
   * @returns {Promise<Object>} Usuário autenticado
   */
  async login(email, senha) {
    // Esqueleto inicial: será implementado na Unidade 1
    throw new Error('Não implementado ainda (Unidade 1)');
  },

  /**
   * Encerra a sessão ativa do usuário atual.
   */
  logout() {
    // Esqueleto inicial: será implementado na Unidade 1
    const estado = window.Store.ler();
    estado.sessao = null;
    window.Store.salvar(estado);
  },

  /**
   * Retorna os dados do usuário autenticado no momento, ou null.
   * @returns {Object|null}
   */
  usuarioAtual() {
    // Esqueleto inicial: será implementado na Unidade 1
    const estado = window.Store.ler();
    if (!estado.sessao || !estado.sessao.usuarioId) return null;
    return estado.usuarios.find(u => u.id === estado.sessao.usuarioId) || null;
  },

  /**
   * Exige que o usuário esteja autenticado para prosseguir.
   * Se anônimo, redireciona para a página de login informada.
   * Cobre: RN01
   * @param {string} caminhoLogin - Caminho relativo para login.html
   * @returns {Object} Usuário autenticado
   */
  exigirLogin(caminhoLogin = 'login.html') {
    const usuario = this.usuarioAtual();
    if (!usuario) {
      window.location.href = caminhoLogin;
      throw new window.RegraViolada('RN01', 'Acesso restrito: usuário não autenticado.');
    }
    return usuario;
  }
};

window.Auth = Auth;
