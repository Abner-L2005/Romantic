// js/auth.js
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
 * - RN01: Acesso restrito a usuários autenticados. Redireciona usuários anônimos.
 * - RN07: Validação de e-mail único, formato sintático válido e senha com mínimo de 6 caracteres.
 * - RNF04: Senhas nunca salvas em texto puro; hashing criptográfico SHA-256 via crypto.subtle.
 */

/**
 * Função utilitária para converter uma string de senha em hash hexadecimal SHA-256.
 * Aplica: RNF04
 * @param {string} textoPuro 
 * @returns {Promise<string>} Hash hexadecimal SHA-256
 */
async function gerarHashSHA256(textoPuro) {
  if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
    const encoder = new TextEncoder();
    const dados = encoder.encode(textoPuro);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dados);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback determinístico simples para ambientes sem crypto.subtle
  let hash = 0;
  for (let i = 0; i < textoPuro.length; i++) {
    hash = (hash << 5) - hash + textoPuro.charCodeAt(i);
    hash |= 0;
  }
  return 'fallback_' + Math.abs(hash).toString(16);
}

/**
 * Valida o formato sintático de um e-mail.
 * Aplica: RN07
 * @param {string} email 
 * @returns {boolean}
 */
function validarFormatoEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const Auth = {
  /**
   * Realiza o cadastro de um novo usuário.
   * Aplica: RN07 e RNF04
   * @param {Object} dados - { nome, email, senha, dataNascimento }
   * @returns {Promise<Object>} Usuário cadastrado
   */
  async cadastrar({ nome, email, senha, dataNascimento }) {
    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
      throw new window.RegraViolada('RN07', 'O nome é obrigatório.');
    }

    const emailLimpo = (email || '').trim().toLowerCase();
    if (!validarFormatoEmail(emailLimpo)) {
      throw new window.RegraViolada('RN07', 'Formato de e-mail inválido.');
    }

    if (!senha || typeof senha !== 'string' || senha.length < 6) {
      throw new window.RegraViolada('RN07', 'A senha deve conter no mínimo 6 caracteres.');
    }

    const estado = window.Store.ler();

    // Verifica se já existe outro usuário cadastrado com o mesmo e-mail (RN07)
    const emailExistente = estado.usuarios.some(u => u.email.toLowerCase() === emailLimpo);
    if (emailExistente) {
      throw new window.RegraViolada('RN07', 'Este e-mail já está cadastrado.');
    }

    // Gera o hash criptográfico SHA-256 da senha (RNF04)
    const senhaHash = await gerarHashSHA256(senha);

    const novoUsuario = {
      id: window.Store.novoId(),
      nome: nome.trim(),
      email: emailLimpo,
      senhaHash,
      dataNascimento: dataNascimento || '',
      casalId: null,
      criadoEm: new Date().toISOString()
    };

    estado.usuarios.push(novoUsuario);
    estado.sessao = { usuarioId: novoUsuario.id };
    window.Store.salvar(estado);

    return novoUsuario;
  },

  /**
   * Autentica um usuário existente com e-mail e senha.
   * Aplica: RN01 e RNF04
   * @param {string} email 
   * @param {string} senha 
   * @returns {Promise<Object>} Usuário autenticado
   */
  async login(email, senha) {
    const emailLimpo = (email || '').trim().toLowerCase();
    if (!emailLimpo || !senha) {
      throw new window.RegraViolada('RN01', 'Informe o e-mail e a senha.');
    }

    const estado = window.Store.ler();
    const usuario = estado.usuarios.find(u => u.email.toLowerCase() === emailLimpo);

    if (!usuario) {
      throw new window.RegraViolada('RN01', 'Credenciais inválidas: e-mail ou senha incorretos.');
    }

    const hashInformado = await gerarHashSHA256(senha);
    if (usuario.senhaHash !== hashInformado) {
      throw new window.RegraViolada('RN01', 'Credenciais inválidas: e-mail ou senha incorretos.');
    }

    estado.sessao = { usuarioId: usuario.id };
    window.Store.salvar(estado);

    return usuario;
  },

  /**
   * Encerra a sessão ativa do usuário atual.
   */
  logout() {
    const estado = window.Store.ler();
    estado.sessao = null;
    window.Store.salvar(estado);
  },

  /**
   * Retorna os dados do usuário autenticado no momento, ou null.
   * @returns {Object|null}
   */
  usuarioAtual() {
    const estado = window.Store.ler();
    if (!estado.sessao || !estado.sessao.usuarioId) return null;
    return estado.usuarios.find(u => u.id === estado.sessao.usuarioId) || null;
  },

  /**
   * Exige que o usuário esteja autenticado para prosseguir.
   * Se anônimo, redireciona para a página de login informada.
   * Aplica: RN01
   * @param {string} [caminhoLogin="login.html"] - Caminho relativo para login.html
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
