# Romantic — Para continuar escolhendo depois do match ❤️

O **Romantic** é uma aplicação web mobile-first voltada para casais (com foco na faixa etária de 18 a 25 anos) que gamifica a rotina a dois. O casal escolhe ideias de atividades criativas e viáveis, transforma-as em desafios concretos, conclui com o registro de memórias afetivas (foto e mensagem), acumula pontos e ofensiva diária (dias consecutivos) e resgata recompensas personalizadas criadas pelos próprios parceiros.

* **Slogan:** *"Para continuar escolhendo depois do match."*
* **Alinhamento com Objetivos de Desenvolvimento Sustentável (ODS da ONU):**
  * **ODS 3 — Saúde e Bem-Estar:** Fortalecimento dos laços afetivos, redução do estresse diário, saúde mental e qualidade de vida por meio de momentos de conexão e cumplicidade mútua.
  * **ODS 5 — Igualdade de Gênero:** Parceria equilibrada, comunicação aberta e divisão colaborativa do planejamento das atividades a dois, sem sobrecarga para nenhuma das partes.

---

## 👥 Equipe e Decomposição em Unidades (SDD)

O projeto foi estruturado seguindo rigorosamente a metodologia **Spec-Driven Development (SDD)**, com a especificação técnica canônica em [`docs/SPEC.md`](docs/SPEC.md) como única fonte da verdade. O desenvolvimento foi decomposto em 4 unidades colaborativas:

| Unidade | Escopo Principal | Arquivos sob Responsabilidade |
| :--- | :--- | :--- |
| **Unidade 1** | Fundação, Identidade Visual, Auth e Vínculo | `css/base.css`, `js/storage.js`, `js/auth.js`, `js/casal.js`, `js/layout.js`, `index.html`, `pages/login.html`, `pages/cadastro.html`, `pages/vinculo.html` |
| **Unidade 2** | Catálogo de Ideias e Dashboard | `css/catalogo.css`, `js/dados-ideias.js`, `js/ideias.js`, `pages/dashboard.html`, `pages/explorar.html`, `pages/ideia.html` |
| **Unidade 3** | Desafios, Conclusão, Memórias e Gamificação | `css/desafios.css`, `js/desafios.js`, `js/pontuacao.js`, `pages/desafios.html` |
| **Unidade 4 (Esta Entrega)** | Recompensas, Perfil do Casal e Suíte de Testes | `js/recompensas.js`, `pages/recompensas.html`, `pages/perfil.html`, `tests/tests.html`, `README.md` |

---

## 🚀 Como Rodar o Projeto

O projeto é 100% estático (HTML, CSS e JavaScript puro), sem necessidade de instalação de dependências, Node.js ou compilação prévia (`npm`).

### Opção 1: VS Code (Live Server)
1. Abra a pasta do projeto no **Visual Studio Code**.
2. Instale a extensão **Live Server** (caso ainda não possua).
3. Clique com o botão direito no arquivo `index.html` (ou qualquer arquivo em `pages/`) e selecione **"Open with Live Server"**.
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500/`.

### Opção 2: Python HTTP Server (Terminal)
Abra o terminal na pasta raiz do projeto e execute:
```bash
# Para Python 3.x:
python -m http.server 8000
```
Em seguida, acesse no navegador: `http://localhost:8000/`.

---

## 🌐 Publicação no GitHub Pages

O projeto foi concebido para implantação imediata e fluida no **GitHub Pages**:
* **URL de Produção:** `https://<usuario-ou-org>.github.io/<repositorio>/`
* **Regra de Caminhos Relativos:** Todas as importações de scripts (`<script src="...">`), estilos (`<link href="...">`) e imagens (`<img src="...">`) utilizam **estritamente caminhos relativos** (ex.: `../js/storage.js`, `pages/login.html`). Nenhuma referência contém barra inicial `/`, garantindo pleno funcionamento em qualquer subdiretório do GitHub Pages.

---

## 🤖 Colaboração com IA (Spec-Driven Development)

O desenvolvimento desta entrega utilizou Inteligência Artificial sob as diretrizes de **Spec-Driven Development (SDD)**:
1. **Aderência Estrita à Especificação:** A IA operou tendo `docs/SPEC.md` e `CLAUDE.md` como documentos normativos e inegociáveis. Nenhuma biblioteca externa, rota ou contrato de módulo foi inventado.
2. **Preservação de Escopo e Não-Regressão:** Apenas os arquivos de escopo da Unidade 4 foram desenvolvidos, sem reescrita de arquivos de colegas de equipe, garantindo integração suave e isolamento de responsabilidades.
3. **Rastreabilidade de Regras de Negócio:** Cada função implementada contém citação explícita em comentário JSDoc e no corpo do código sobre a regra aplicada (ex.: `// Aplica RN06`, `// Aplica RN01`), facilitando auditoria técnica e revisão por pares.
4. **Foco em Qualidade e Acessibilidade:** Geração de código limpo, nivelado para estudantes universitários, mobile-first, com contraste WCAG 2.1 AA (≥ 4,5:1), labels associados e navegação por teclado com foco evidente.

---

## 🏛️ Registros de Decisões Arquiteturais (ADRs)

### ADR 01: Persistência Client-Side via LocalStorage (`romantic:v1`)
* **Decisão:** Utilização do `localStorage` do navegador sob a chave única `"romantic:v1"` em substituição a um banco de dados relacional e API back-end tradicional.
* **Justificativa:** Elimina custos de servidor e dependências complexas de deployment, viabilizando execução estática instantânea no GitHub Pages e permitindo testes unitários imediatos no navegador.

### ADR 02: Segurança de Credenciais com Web Crypto API (SHA-256)
* **Decisão:** Hashing de senhas via API nativa criptográfica do navegador (`window.crypto.subtle.digest("SHA-256", ...)`).
* **Justificativa:** Garante conformidade com o requisito não funcional RNF04, impedindo armazenamento de senhas em texto puro no `localStorage` sem precisar de bibliotecas externas pesadas.

### ADR 03: Scripts Clássicos e Modularização Global (`window.*`)
* **Decisão:** Uso de tags `<script src="...">` tradicionais sem bundlers (`npm`, `webpack`, `vite`) ou módulos ES (`type="module"`), expondo os módulos no escopo global (`window.Store`, `window.Auth`, `window.Recompensas`, etc.).
* **Justificativa:** Garante compatibilidade direta com abertura via protocolo local de arquivos e servidores estáticos simples, evitando erros de CORS/MIME típicos de módulos ES locais.

### ADR 04: Suíte de Testes Automatizados no Navegador (`tests/tests.html`)
* **Decisão:** Construção de um mini test runner nativo sem bibliotecas externas (Jest, Mocha, Cypress), com funções `teste(nome, fn)` e `assert`.
* **Justificativa:** Permite que avaliadores, professores e alunos verifiquem toda a conformidade do sistema (RN01 a RN08) abrindo um único arquivo HTML, com feedback visual acessível e isolamento de estado por teste via `Store.resetar()`.

---

## 🧪 Evidências dos Testes Automatizados

A suíte executável em `tests/tests.html` cobre integralmente as regras **RN01 a RN08**, englobando cenários principais e casos de borda:

| Regra | Cenário de Teste | Caso Coberto | Status |
| :--- | :--- | :--- | :---: |
| **RN01** | Acesso Restrito | Bloqueio de listagem de desafios para usuário não autenticado | ✅ PASSOU |
| **RN01** | Acesso Restrito | Bloqueio de criação de recompensas para usuário anônimo | ✅ PASSOU |
| **RN02** | Exclusividade do Casal | Usuário já em casal impedido de aceitar convite de outro parceiro | ✅ PASSOU |
| **RN02** | Exclusividade do Casal | Bloqueio de criação de recompensa para usuário sem casal ativo | ✅ PASSOU |
| **RN03** | Isolamento de Dados | Casal A impedido de concluir desafio pertencente ao Casal B | ✅ PASSOU |
| **RN03** | Isolamento de Dados | Casal A impedido de resgatar recompensa do Casal B | ✅ PASSOU |
| **RN04** | Unicidade de Conclusão | Conclusão válida na 1ª vez registra status `CONCLUIDO` e memória | ✅ PASSOU |
| **RN04** | Unicidade de Conclusão | Rejeição estrita de tentativa de concluir o mesmo desafio duas vezes | ✅ PASSOU |
| **RN05** | Ofensiva e Pontuação | 1ª conclusão histórica do casal define a ofensiva em 1 | ✅ PASSOU |
| **RN05** | Ofensiva e Pontuação | Múltiplas conclusões no mesmo dia somam pontos e mantêm ofensiva em 1 | ✅ PASSOU |
| **RN05** | Ofensiva e Pontuação | Conclusão em dia consecutivo (+1 dia civil) incrementa ofensiva para 2 | ✅ PASSOU |
| **RN05** | Ofensiva e Pontuação | Conclusão após intervalo (> 1 dia pulado) reinicia a ofensiva em 1 | ✅ PASSOU |
| **RN06** | Resgate de Recompensas | Resgate com saldo suficiente debita pontos do saldo corretamente | ✅ PASSOU |
| **RN06** | Resgate de Recompensas | Resgate com saldo exatamente igual ao custo tem sucesso e zera o saldo | ✅ PASSOU |
| **RN06** | Resgate de Recompensas | Bloqueio de tentativa de resgate quando saldo é insuficiente | ✅ PASSOU |
| **RN06** | Resgate de Recompensas | Bloqueio de tentativa de resgatar recompensa com status `RESGATADA` | ✅ PASSOU |
| **RN07** | Validação de Cadastro | Cadastro válido persiste usuário com senha em hash SHA-256 e sessão | ✅ PASSOU |
| **RN07** | Validação de Cadastro | Rejeição de cadastro com senha menor que 6 caracteres | ✅ PASSOU |
| **RN07** | Validação de Cadastro | Rejeição de cadastro com e-mail duplicado (já existente) | ✅ PASSOU |
| **RN07** | Validação de Cadastro | Rejeição de cadastro com formato sintático de e-mail inválido | ✅ PASSOU |
| **RN08** | Validação de Convites | Envio de convite válido cria registro com status `PENDENTE` | ✅ PASSOU |
| **RN08** | Validação de Convites | Bloqueio de auto-convite (tentativa de convidar o próprio e-mail) | ✅ PASSOU |
| **RN08** | Validação de Convites | Bloqueio de convite para parceiro que já pertence a outro casal ativo | ✅ PASSOU |

### Como Executar os Testes
Basta abrir o arquivo [`tests/tests.html`](tests/tests.html) no navegador (via Live Server ou duplo clique). A suíte executa automaticamente em menos de 1 segundo e exibe a contagem e indicadores visuais acessíveis.
