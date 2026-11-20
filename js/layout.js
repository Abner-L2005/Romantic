/**
 * Arquivo: js/layout.js
 * Módulo: Layout
 * Dono: Unidade 1 (Componentes Visuais Transversais)
 * 
 * Contrato:
 * - Layout.montar({ paginaAtiva: string }): void
 * 
 * Responsabilidades:
 * - Injeta a barra de navegação responsiva Bootstrap 5 (navbar com menu sanduíche mobile).
 * - Injeta o rodapé unificado com slogan e menção a ODS 3 e ODS 5.
 * - Calcula dinamicamente caminhos relativos (sem "/" inicial) para raiz vs /pages.
 * - Exibe estado de autenticação (links de login/cadastro vs dashboard/perfil/logout).
 */

const Layout = {
  /**
   * Constrói e injeta o cabeçalho e rodapé padronizados da aplicação.
   * @param {Object} opcoes - { paginaAtiva: string }
   */
  montar({ paginaAtiva = '' } = {}) {
    // Esqueleto inicial: será implementado na Unidade 1
    const naRaiz = !window.location.pathname.includes('/pages/');
    const prefixo = naRaiz ? '' : '../';

    const headerEl = document.getElementById('app-header');
    const footerEl = document.getElementById('app-footer');

    if (headerEl) {
      headerEl.innerHTML = `<!-- Navbar do Romantic será renderizada aqui -->`;
    }

    if (footerEl) {
      footerEl.innerHTML = `
        <footer class="py-3 bg-white border-top text-center text-muted small">
          <div class="container">
            <p class="mb-1"><strong>Romantic</strong> — Para continuar escolhendo depois do match.</p>
            <p class="mb-0 text-secondary">Apoiando o ODS 3 (Saúde e Bem-Estar) e ODS 5 (Igualdade de Gênero).</p>
          </div>
        </footer>
      `;
    }
  }
};

window.Layout = Layout;
