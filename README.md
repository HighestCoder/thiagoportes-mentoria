# Mentoria Emagrecimento Definitivo · Thiago Portes

> Landing page institucional de alta conversão voltada para o programa de acompanhamento individual do personal trainer e mentor de alta performance **Thiago Portes**.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Design](https://img.shields.io/badge/Design_Ref-Fenriz_Gym_Berlin-f9f383?style=for-the-badge&logoColor=black)](https://www.fenriz-gym.com/)

---

## 🎯 Visão Geral

Desenvolvida com foco em **autoridade, exclusividade e conversão direta via WhatsApp**, esta aplicação web combina uma narrativa persuasiva (copywriting voltado para o público que busca consistência duradoura e repulsa a radicalismos) com uma identidade visual moderna de padrão internacional.

A arquitetura visual foi projetada inspirando-se na referência premiada do **[Fenriz Gym Berlin](https://www.fenriz-gym.com/)** (Awwwards), abandonando clichês de academias comerciais e adotando uma linguagem industrial atlética, brutalista e de alto contraste.

---

## ⚡ Destaques de Engenharia e UX

- **Zero Dependências Pesadas:** Desenvolvido em **Vanilla Web Stack** (HTML5, CSS3 moderno e JavaScript ES6+), garantindo tempos de carregamento instantâneos e pontuações de performance próximas a 100 no Google Lighthouse.
- **Microinterações e Física Customizada:**
  - **Preloader Progressivo:** Feedback visual de inicialização que calcula a prontidão da árvore DOM.
  - **Cursor Follower Dinâmico:** Detecção de ponteiro fino (`pointer: fine`) com expansão em elementos clicáveis.
  - **Scroll Reveal Escalonado:** Implementação performática com `IntersectionObserver` que anima elementos à medida que entram na viewport, respeitando diretivas de acessibilidade (`prefers-reduced-motion`).
  - **Cards com Spotlight Interativo:** Efeito de iluminação radial dinâmica que rastreia as coordenadas do mouse (`mousemove`) em tempo real.
  - **Header Inteligente:** Ocultação contextual na descida do scroll e reaparição suave na rolagem ascendente.
  - **Botão Flutuante Condicional (Mobile):** CTA de contato direto que surge de forma fluida após o usuário ultrapassar a seção Hero.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação orientada a acessibilidade, SEO on-page, preloading de assets críticos e metadados Open Graph.
- **CSS3 Moderno:**
  - CSS Grid e Flexbox para layouts modulares e blueprints de timetable.
  - CSS Custom Properties (Variáveis de Design Tokens) para paleta de cores, tipografia e espaçamentos.
  - Gradiente de assinatura dinâmico (*Acid Volt* `#f9f383`, *Crimson Coral* `#f14553` e *Cobalt* `#19477e`).
  - Animações via `@keyframes` otimizadas para GPU (`transform` e `opacity`).
- **JavaScript (ES6+):** Código modularizado, assíncrono e encapsulado via IIFE para evitar poluição do escopo global.
- **Google Fonts:** Combinação das famílias `Barlow Condensed`, `Oswald`, `Space Grotesk` e `Inter`.

---

## 📂 Estrutura do Projeto

```text
Mentoria/
├── css/
│   └── styles.css          # Design system completo, componentes e media queries
├── img/
│   ├── costas.jpeg         # Imagem de destaque no Hero (Dorsal e rigidez técnica)
│   ├── hero.jpeg           # Fotografia de vivência atlética externa (Band e Galeria)
│   ├── hulk.jpeg           # Pose clássica de simetria e definição (Galeria)
│   ├── side.jpeg           # Fotografia de perfil para a seção Sobre
│   └── th.jpeg             # Registro no palco oficial Men's Physique
├── js/
│   └── main.js             # Lógica de interação, observers, preloader e animações
├── .gitignore              # Regras de exclusão do controle de versão
├── index.html              # Documento principal da aplicação
└── README.md               # Documentação técnica do projeto
```

---

## 🚀 Como Executar Localmente

Como a aplicação é composta por arquivos estáticos puros, não é necessária a instalação de dependências ou processo de compilação.

### Opção 1: Live Server (VS Code)
1. Abra a pasta do projeto no **Visual Studio Code**.
2. Clique com o botão direito sobre o arquivo `index.html`.
3. Selecione **"Open with Live Server"**.

### Opção 2: Servidor HTTP via Python
```bash
# Na raiz do diretório do projeto:
python -m http.server 3000
```
Em seguida, acesse no navegador: `http://localhost:3000`

### Opção 3: Servidor Node (npx)
```bash
npx serve .
```

---

## 👨‍💻 Créditos

Projeto arquitetado e desenvolvido por **[Yago Leonardo](https://github.com/HighestCoder)**.
Copywriting técnico e acompanhamento de mentoria por **Thiago Portes**.
