# Guia de Desenvolvimento e Contexto do Agente — Romantic (CLAUDE.md)

Este documento estabelece as diretrizes fundamentais para qualquer agente ou engenheiro de software atuando no projeto **Romantic**.

---

## 1. Fonte da Verdade (Spec-Driven Development)
* O arquivo [`docs/SPEC.md`](docs/SPEC.md) é a **única fonte da verdade** para arquitetura, regras de negócio, contratos de dados, interfaces e escopo.
* **Nunca invente ou implemente funcionalidades fora da especificação.**
* Qualquer dúvida ou decisão de design deve ser resolvida consultando `docs/SPEC.md`.

---

## 2. Estratégia de Branches e Git Workflow
* Nunca faça commits diretamente na branch `main`.
* Todo desenvolvimento deve ocorrer em branches de funcionalidade com o prefixo `feature/`:
  * Exemplos: `feature/u1-auth-casal`, `feature/u2-catalogo-ideias`, `feature/u3-desafios-pontuacao`, `feature/u4-recompensas-perfil`.
* **Padrão de commits:**
  * Utilize mensagens no tempo verbal presente do indicativo em português (ou convenção conventional commits), com escopo bem delimitado:
    * `feat(auth): implementa hash de senha SHA-256 e sessao ativa`
    * `feat(casal): adiciona envio e aceite de convites de vinculo`
    * `fix(desafios): bloqueia conclusao duplicada conforme RN04`
    * `test(pontuacao): adiciona assercoes para sequencia de ofensiva`

---

## 3. Restrições Técnicas Rígidas
* **Sem Frameworks JS e Sem Build:** Proibido o uso de React, Vue, Svelte, Angular, TypeScript compiler, Vite, Webpack ou npm. O projeto deve rodar diretamente no navegador abrindo os arquivos HTML.
* **Scripts Clássicos:** Use tags `<script src="...">` tradicionais sem `type="module"`, expondo os módulos como objetos globais na janela (`window.Store`, `window.Auth`, etc.).
* **Caminhos Estritamente Relativos:**
  * O projeto será publicado no **GitHub Pages** dentro de subdiretório.
  * **NUNCA** utilize barra inicial `/` em caminhos de arquivos, links (`href`), imagens (`src`) ou scripts (`src`).
  * Exemplos corretos: `href="pages/login.html"`, `href="../css/base.css"`, `src="../js/storage.js"`.
  * Exemplos incorretos: `href="/pages/login.html"`, `src="/js/storage.js"`.

---

## 4. Separação de Camadas e Regras de Negócio
* **Isolamento de DOM:** Arquivos de regras de negócio (`js/storage.js`, `js/auth.js`, `js/casal.js`, `js/ideias.js`, `js/desafios.js`, `js/pontuacao.js`, `js/recompensas.js`) **não** devem conter referências a `document`, `window.location` (exceto em `Auth.exigirLogin` para redirect explícito), formulários ou elementos visuais.
* **Tratamento de Exceções:** Ao violar qualquer regra de negócio, instancie e lance obrigatoriamente a classe `RegraViolada(regra, mensagem)` (definida em `storage.js`).
* **Rastreabilidade de Regras:** Cada método ou função que implementa ou valida uma regra de negócio **deve obrigatoriamente citar o código da RN em comentário JSDoc**:
  ```javascript
  /**
   * Valida unicidade e formato antes de cadastrar.
   * Cobre: RN07
   */
  async cadastrar({ nome, email, senha, dataNascimento }) { ... }
  ```

---

## 5. Qualidade, Testes e Verificação
* **Execução dos Testes:** Antes de considerar qualquer unidade ou tarefa concluída, abra e execute a suíte de testes em `tests/tests.html`.
* **Integridade dos Testes:** **Nunca altere, comente ou enfraqueça um teste para fazê-lo passar.** Se um teste falhar, o código de produção sob teste deve ser corrigido para aderir à especificação canônica em `docs/SPEC.md`.
* **Acessibilidade:** Certifique-se de que todo elemento interativo criado possui acessibilidade compatível com WCAG 2.1 AA (labels, contraste, foco visível, `alt` em imagens e atributos ARIA onde pertinente).
