// ==========================================================================
// HIGH-END PRODUCTION MOCK DATA STORAGE
// ==========================================================================

const API_KEY = "545ad74c61aee381a5d1bad605e468a7";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
// ==========================================================================
// RENDER ENGINE
// ==========================================================================
function generateMovieCardHtml(movie) {

    const poster = movie.poster_path
        ? `${IMAGE_URL}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const year = movie.release_date
        ? movie.release_date.split("-")[0]
        : "N/A";

    return `
        <div class="movie-card" data-id = "${movie.id}">
            <div class="card-poster-wrapper">
                <div class="card-badge">
                    <i class="fa-solid fa-star"></i>
                    ${movie.vote_average?.toFixed(1)}
                </div>

                <img
                    src="${poster}"
                    alt="${movie.title}"
                    class="card-poster"
                    loading="lazy"
                >
            </div>

            <div class="card-details">
                <h3 class="card-title">${movie.title}</h3>
                <div class="card-meta">${year}</div>
            </div>
        </div>
    `;
}
async function getTrendingMovies() {

    const response = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );

    const data = await response.json();

    return data.results;
}
async function getTopRatedMovies() {

    const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );

    const data = await response.json();

    return data.results;
}
async function getMovieDetails() {

    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );

    const movie = await response.json();

    renderMovie(movie);
}

getMovieDetails();
async function initializeApp() {

    const trendingMovies =
        await getTrendingMovies();

    const topRatedMovies =
        await getTopRatedMovies();

    document
        .getElementById("trending-carousel")
        .innerHTML =
        trendingMovies
        .slice(0,10)
        .map(generateMovieCardHtml)
        .join("");

    document
        .getElementById("top-rated-grid")
        .innerHTML =
        topRatedMovies
        .slice(0,8)
        .map(generateMovieCardHtml)
        .join("");
}

/*function renderCollection(key) {
    const collectionsCarousel = document.getElementById('collections-carousel');
    const movies = movieDatabase.collections[key] || [];
    collectionsCarousel.innerHTML = movies.map(movie => generateMovieCardHtml(movie)).join('');
}
*/
// ==========================================================================
// INTERACTIVE ENGINE & EVENTS
// ==========================================================================
document.addEventListener('DOMContentLoaded',async () => {
   await initializeApp();

    // Horizontal Scrolling Controls for Trending Setup
    const trendingCarousel = document.getElementById('trending-carousel');
    document.querySelector('.next-btn').addEventListener('click', () => {
        trendingCarousel.scrollLeft += 320;
    });
    document.querySelector('.prev-btn').addEventListener('click', () => {
        trendingCarousel.scrollLeft -= 320;
    });
    //Click Event

    document.addEventListener("click", (e) => {

    const card = e.target.closest(".movie-card");

    if(!card) return;

    const movieId = card.dataset.id;

    window.location.href =
        `movie.html?id=${movieId}`;
});
    // Curated Tabs Switching Event Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const targetCollection = e.target.getAttribute('data-target');
            renderCollection(targetCollection);
        });
    });

    // Surprise Me Logic Engine
    /*const surpriseBtn = document.getElementById('surprise-btn');
    surpriseBtn.addEventListener('click', () => {
        const allMovies = [
            ...movieDatabase.trending, 
            ...movieDatabase.topRated,
            ...Object.values(movieDatabase.collections).flat()
        ];
        const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
        alert(`✨ MovieVerse recommends: "${randomMovie.title}" (Rating: ${randomMovie.rating}/10)`);
    });*/

    // Cinematic Parallax Background Setup for Hero Frame
    window.addEventListener('scroll', () => {
        const overlay = document.querySelector('.hero-bg-overlay');
        let scrollOffset = window.pageYOffset;
        overlay.style.transform = `translateY(${scrollOffset * 0.4}px) scale(${1 + scrollOffset * 0.0005})`;
    });
});