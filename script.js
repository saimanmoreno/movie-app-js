const APIKEY = "04c35731a5ee918f014970082a0088b1";

const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKEY;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=" + APIKEY + "&query=";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

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

