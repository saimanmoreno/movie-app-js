const APIKEY = "04c35731a5ee918f014970082a0088b1";

const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKEY;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=" + APIKEY + "&query=";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

/**
 * Receives the list of movies and assembles the element with image, title, votes and overview for each movie
 * @param {*} movies 
 */
function showMovies(movies) {

    //clear main
    main.innerHTML = ""

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">
                    ${vote_average}
                </span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)

    });
}

/**
 * Fetch movies from API and returns the result using fetch function. The results will be passed to shoMovies() function
 * @param {*} url 
 */
async function getMovies(url) {

    const resp = await fetch(url)
    const respData = await resp.json();     // convert the response to json

    showMovies(respData.results)
}

/**
 * Used to return the color based on movie rating obtained from API. This color is used in CSS to choose the color of the movie rating text
 * @param {*} vote 
 * @returns 
 */
function getClassByRate(vote) {

    if (vote >= 8) return "green"

    else if (vote >= 5) return "orange"

    else return "red"

}

/**
 * Search movies event listener
 */
form.addEventListener("submit", (e) => {

    e.preventDefault()
    const searchTerm = search.value

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm)
        search.value = ""
    }
})

// main function
getMovies(APIURL)