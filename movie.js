const API_KEY = "545ad74c61aee381a5d1bad605e468a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const movieId = new URLSearchParams(window.location.search).get("id");

async function getMovieDetails() {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        const movie = await response.json();
        renderMovie(movie);
    } catch (error) {
        console.error("Error fetching movie data profiles:", error);
    }
}

function renderMovie(movie) {
    // Safely extract names of genres arrays
    const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'Cinematic';
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

    document.getElementById("movie-details").innerHTML = `
        <div class="spotlight-hero">
            <div class="hero-backdrop" style="background-image: url('${IMAGE_URL}${movie.backdrop_path}');"></div>
            <div class="hero-dim-overlay"></div>
            
            <div class="spotlight-container">
                <div class="spotlight-layout-grid">
                    
                    <div class="poster-panel animate-fade-up">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="premium-poster">
                    </div>

                    <div class="content-panel animate-fade-up-delayed">
                        <h1 class="movie-main-title">${movie.title}</h1>
                        
                        <div class="movie-meta-row">
                            <span class="rating-badge"><i class="fa-solid fa-star text-glow"></i> ${movie.vote_average.toFixed(1)}</span>
                            <span class="meta-item"><i class="fa-regular fa-calendar"></i> ${releaseYear}</span>
                            <span class="meta-item"><i class="fa-solid fa-film"></i> ${genres}</span>
                        </div>

                        <p class="movie-overview-text">${movie.overview || "No overview narrative available for this layout asset profile."}</p>
                        
                        <div class="action-row-buttons">
                            <button class="btn-action primary-glow"><i class="fa-solid fa-play"></i> Watch Trailer</button>
                            <button class="btn-action secondary-glass"><i class="fa-solid fa-bookmark"></i> Add to Watchlist</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

getMovieDetails();