
# Romantic 💕
> *"Para continuar escolhendo depois do match."*

Aplicação web mobile-first voltada para casais (com foco em 18–25 anos) manterem e renovarem a conexão no dia a dia por meio de desafios a dois, memórias afetivas, gamificação de hábitos e recompensas personalizadas.

---

## 🎯 Alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS)
- **ODS 3 — Saúde e Bem-Estar (Principal):** Fortalecimento dos laços afetivos, redução do estresse da rotina e incentivo à saúde mental por meio de momentos de conexão e lazer compartilhado.
- **ODS 5 — Igualdade de Gênero:** Parceria equilibrada, comunicação transparente e divisão mútua no planejamento dos encontros e decisões do casal.

---

## 🛠️ Tecnologias e Restrições Técnicas
- **Front-end:** HTML5 semântico, Bootstrap 5.3 (via CDN), JavaScript puro (ES2020).
- **Sem Back-end:** 100% estático, sem frameworks JS (sem React/Vue/Angular) e sem build/npm.
- **Persistência:** `localStorage` do navegador sob chave única `"romantic:v1"`.
- **Criptografia:** Web Cryptography API (`crypto.subtle` com SHA-256 para senhas).
- **Compatibilidade GitHub Pages:** Utiliza **apenas caminhos relativos** (compatível com subpastas).
- **Acessibilidade:** Padrão WCAG 2.1 AA (foco visível, contraste mínimo 4,5:1, `lang="pt-BR"`).

---

## 📁 Estrutura de Pastas

```text
Romantic/
├── index.html               # Landing page pública
├── pages/
│   ├── login.html           # Tela de autenticação
│   ├── cadastro.html        # Cadastro de novos usuários
│   ├── vinculo.html         # Convite e conexão do casal
│   ├── dashboard.html       # Painel do casal, ofensiva e Ideia do Dia
│   ├── explorar.html        # Catálogo com filtros de categorias e busca
│   ├── ideia.html           # Detalhes da ideia e aceite de desafio
│   ├── desafios.html        # Meus desafios (ativos e concluídos com memória)
│   ├── recompensas.html     # Criação, listagem e resgate de recompensas
│   └── perfil.html          # Perfil do casal e mural de memórias
├── css/
│   ├── base.css             # Tema (#E91E63), Poppins, acessibilidade e utilitários
│   ├── catalogo.css         # Estilização do catálogo, chips e Ideia do Dia
│   └── desafios.css         # Estilização de desafios e memórias
├── js/
│   ├── storage.js           # Gerenciamento de localStorage e RegraViolada (COMPLETO)
│   ├── auth.js              # Cadastro, login, logout e sessão
│   ├── casal.js             # Convites, aceite e gestão do casal
│   ├── layout.js            # Injeção dinâmica de navbar e rodapé
│   ├── dados-ideias.js      # Array estático com 20 ideias
│   ├── ideias.js            # Filtros e algoritmo determinístico da Ideia do Dia
│   ├── desafios.js          # Aceite e conclusão de desafios com memórias
│   ├── pontuacao.js         # Saldo de pontos e sequência de ofensiva
│   └── recompensas.js       # Economia de pontos e resgates
├── tests/
│   └── tests.html           # Suíte de testes automatizados no navegador
├── docs/
│   └── SPEC.md              # Fonte canônica da verdade (Spec-Driven Development)
├── CLAUDE.md                # Diretrizes para agentes de IA
└── README.md                # Documentação geral do projeto
```

---

## 🚀 Como Executar
Por ser uma aplicação 100% estática sem necessidade de compilação ou instalação de pacotes:

1. Clone o repositório ou baixe os arquivos.
2. Abra `index.html` diretamente em qualquer navegador moderno (Chrome, Edge ou Firefox).
3. Para rodar em um servidor local estático simples (opcional):
   ```bash
   # Exemplo com Python
   python -m http.server 8000
   ```
   E acesse `http://localhost:8000`.

---

## 🧪 Suíte de Testes Automatizados
O projeto conta com um runner de testes automatizados puro que valida todas as regras de negócio (**RN01 a RN08**) e os contratos de cada módulo:

1. Abra o arquivo `tests/tests.html` no seu navegador.
2. O resultado das asserções e relatórios detalhados serão exibidos em tempo real na tela.

---

## 📜 Metodologia e Desenvolvimento
Este projeto adota **Spec-Driven Development (SDD)**. O documento canônico [`docs/SPEC.md`](docs/SPEC.md) rege estritamente todo o escopo, contratos e regras de negócio.
Consulte [`CLAUDE.md`](CLAUDE.md) para orientações sobre workflow de branches e boas práticas de engenharia.
=======
# Romantic
Protótipo web do site Romantic para apresentação e conclusão do 4º semestre em Análise e Desenvolvimento de Sistemas referente à metéria de Projeto Integrador em Programação Web
>>>>>>> 91763e5470c5c4f247bb54cb6c3bdce720cb5534

ativação do Pages
