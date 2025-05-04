# 📄 Documentação do Projeto: Catálogo de Filmes Interativo

## 🧾 Descrição Geral

Este projeto é uma aplicação web simples de catálogo de filmes. Ele exibe uma galeria de filmes, permitindo que o usuário visualize detalhes ao clicar em cada item. Também conta com uma funcionalidade de pesquisa para encontrar filmes específicos.

---

## 📁 Estrutura de Arquivos

```
/
├── index.html     # Estrutura HTML da página
├── style.css      # Estilos visuais da interface
└── script.js      # Funcionalidade interativa com JavaScript
```

---

## 🔧 Tecnologias Utilizadas

- **HTML5** – Estrutura e marcação do conteúdo
- **CSS3** – Estilização e layout da página
- **JavaScript Vanilla** – Funcionalidade de interação

---

## 🧱 index.html

### Principais Componentes:

- `<header>`: Contém o logotipo e um menu de navegação com links fictícios.
- `<main>`:
  - `h1`: Título principal da página.
  - `div.movies-container`: Galeria dos filmes renderizados dinamicamente.
  - `div.search-container`: Campo de pesquisa e resultados.
- `div.movie-details`: Modal exibido ao clicar em um filme, com título e botões para "Assistir", "Fechar" e "Sair".

---

## 🎨 style.css

### Estilos Importantes:

- **Reset básico** de margens e paddings.
- **Layout responsivo em grid** para os filmes (`.movies-container`).
- **Modal estilizado** com fundo escurecido (`.movie-details`).
- **Campo de pesquisa** e seus resultados são estilizados para centralização e leitura clara.
- Paleta de cores: fundo escuro com texto branco e destaques em vermelho.

---

## 🧠 script.js

### Funcionalidades Principais:

- **Renderização de filmes**:

  - Os filmes são carregados a partir de um array de objetos JS contendo título e imagem.
  - Função `renderMovies()` insere os filmes na galeria HTML dinamicamente.

- **Exibição de detalhes**:

  - Ao clicar em um filme, a função `showMovieDetails()` exibe um modal com detalhes.

- **Fechamento do modal**:

  - Com os botões "Fechar" ou "Sair", o modal é escondido via `hideMovieDetails()`.

- **Campo de pesquisa**:
  - Mostrado ao clicar no botão de pesquisa do menu.
  - Filtra os filmes conforme a digitação no `input`, exibindo apenas os que correspondem ao termo inserido.

---

## ✅ Funcionalidades Completas

- [x] Exibição dinâmica de filmes
- [x] Modal com detalhes do filme
- [x] Botões de interação no modal
- [x] Pesquisa de filmes
- [x] Interface limpa e moderna

---

## 🚀 Alterações Futuras

- Integração com API de filmes (ex: TMDb)
- Responsividade para dispositivos móveis
- Filtros por gênero, ano, etc.
- Sistema de favoritos
