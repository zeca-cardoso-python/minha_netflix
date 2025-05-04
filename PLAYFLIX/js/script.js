const apiKey = "ea4c212f8cca73eae979d7077454095f"; // chave da API
const baseUrl = "https://api.themoviedb.org/3";
const moviesContainer = document.getElementById("movies-container");
const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const categoryTitle = document.getElementById("category-title");
const movieDetails = document.getElementById("movie-details");
const trailerContainer = document.getElementById("trailer-container");
const trailerVideo = document.getElementById("trailer-video");

// buscar filmes
async function fetchMovies() {
  try {
    const response = await fetch(
      `${baseUrl}/trending/movie/week?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    moviesContainer.innerHTML = ""; // Limpar
    categoryTitle.textContent = "Filmes em alta"; // Atualiza o título da categoria para Filmes em alta
    data.results.forEach((movie) => {
      createMovieItem(movie);
    });
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
}

// buscar séries
async function fetchSeries() {
  try {
    const response = await fetch(
      `${baseUrl}/trending/tv/week?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    moviesContainer.innerHTML = ""; // Limpar
    categoryTitle.textContent = "Séries em alta"; // Atualiza o título da categoria para Séries em alta
    data.results.forEach((serie) => {
      createMovieItem(serie, "serie");
    });
  } catch (error) {
    console.error("Erro ao buscar séries:", error);
  }
}

// criar os itens de filme ou série
function createMovieItem(item, type = "movie") {
  const movieItem = document.createElement("div");
  movieItem.classList.add("movie-item");

  movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${
    item.title || item.name
  }">
        <h3>${item.title || item.name}</h3>
    `;

  movieItem.addEventListener("click", () => showItemDetails(item, type));
  moviesContainer.appendChild(movieItem);
}

// mostrar os detalhes de um filme ou série
async function showItemDetails(item, type) {
  document.getElementById("movie-title").textContent = item.title || item.name;
  document.getElementById("movie-overview").textContent = item.overview;

  // Buscar o trailer do filme ou série
  const trailerResponse = await fetch(
    `${baseUrl}/${type === "movie" ? "movie" : "tv"}/${
      item.id
    }/videos?api_key=${apiKey}&language=pt-BR`
  );
  const trailerData = await trailerResponse.json();
  const trailer = trailerData.results.find((video) => video.type === "Trailer");

  if (trailer) {
    trailerContainer.style.display = "block";
    trailerVideo.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
  } else {
    trailerContainer.style.display = "none";
  }

  movieDetails.style.display = "flex";
}

// Fechar os detalhes do filme/série
document.getElementById("close-details").addEventListener("click", () => {
  movieDetails.style.display = "none";
  trailerContainer.style.display = "none";
  trailerVideo.src = ""; // Limpar o vídeo do trailer
});

// Exibir o campo de busca ao clicar em "Localizar"
document.getElementById("search-link").addEventListener("click", () => {
  searchContainer.style.display = "block";
  moviesContainer.innerHTML = ""; // Limpar catálogo
  categoryTitle.textContent = "Busca"; // Alterar título da página
  clearSearch(); // Limpar campo de pesquisa e resultados
});

// buscar filmes e séries durante a digitação
searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    // Iniciar a busca quando o usuário digitar mais de 2 caracteres
    const results = await searchItems(query);
    displaySearchResults(results);
  } else {
    searchResults.innerHTML = ""; // Limpar resultados se a pesquisa estiver vazia
  }
});

// buscar filmes e séries
async function searchItems(query) {
  try {
    const response = await fetch(
      `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&language=pt-BR`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro na busca:", error);
  }
}

// exibir os resultados da pesquisa na página
function displaySearchResults(results) {
  searchResults.innerHTML = ""; // Limpar resultados anteriores
  if (results.length === 0) {
    searchResults.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  results.forEach((item) => {
    const type = item.media_type === "movie" ? "movie" : "serie";
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");
    movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${
              item.poster_path
            }" alt="${item.title || item.name}">
            <h3>${item.title || item.name}</h3>
        `;

    movieItem.addEventListener("click", () => showItemDetails(item, type));
    searchResults.appendChild(movieItem);
  });
}

// carregar o catálogo completo (Filmes + Séries)
async function fetchCatalog() {
  await fetchMovies(); // Carregar filmes
  await fetchSeries(); // Carregar séries
}

// Função para limpar o campo de pesquisa e resultados
function clearSearch() {
  searchInput.value = ""; // Limpar o campo de pesquisa
  searchResults.innerHTML = ""; // Limpar resultados de busca
}

// Carregar o catálogo de filmes e séries ao carregar a página
document.addEventListener("DOMContentLoaded", fetchCatalog);

// Evento de navegação para "Home", "Filmes", "Séries"
document.getElementById("home-link").addEventListener("click", () => {
  searchContainer.style.display = "none"; // Esconder a busca
  clearSearch(); // Limpar campo de pesquisa e resultados
  fetchCatalog(); // Recarregar filmes e séries ao clicar em Home
});

document.getElementById("movies-link").addEventListener("click", () => {
  searchContainer.style.display = "none"; // Esconder a busca
  clearSearch(); // Limpar campo de pesquisa e resultados
  fetchMovies(); // Carregar somente filmes ao clicar em Filmes
});

document.getElementById("series-link").addEventListener("click", () => {
  searchContainer.style.display = "none"; // Esconder a busca
  clearSearch(); // Limpar campo de pesquisa e resultados
  fetchSeries(); // Carregar somente séries ao clicar em Séries
});
