// Navbar Transparent to Solid on scroll
document.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    let scrollDown = window.scrollY;
    if (scrollDown > 100) {
        navbar.classList.add("navbar--solid");
    }
    if (scrollDown < 100) {
        navbar.classList.remove("navbar--solid");
    }
})

document.getElementById("close").addEventListener("click", function() {
    let modal = document.getElementById("modal");
    modal.classList.replace("active", "deactivate");
})

// Get Data from API
// Function to get all URLs' images for a specific API's url
async function getImagesUrls(url) {
    let results = await fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (value) {
            let dictMovies = value.results;
            let moviesImagesUrls = [];
            for (let i in dictMovies) {
                let movieUrl = dictMovies[i].image_url;
                let movieId = dictMovies[i].id;
                moviesImagesUrls.push({movieUrl, movieId});
            }
            return moviesImagesUrls;
        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        })
    return results;
}

// Function to populate a carousel using a list of URLs' images and the ID of the carousel to populate
async function populateCarousel(moviesUrlsId, carouselId) {
    let numberOfDivItem = document.querySelectorAll("#" + carouselId + " .item").length;

    for (let i = 0; i < numberOfDivItem; i++) {
        let getDiv = document.querySelectorAll("#" + carouselId + " .item")[i];
        let movieData = moviesUrlsId[i];
        let img = document.createElement("img");
        img.setAttribute("src", movieData.movieUrl);
        img.setAttribute("alt", movieData.movieId);
        getDiv.appendChild(img);
    }
}

// Function get Movie Information from API
async function movieInfo(movieId) {
    let movieData = await fetch("http://localhost:8000/api/v1/titles/" + movieId)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (value) {
            let imgUrl = value.image_url;
            let movieTitle = value.original_title;
            let movieGenre = value.genres;
            let movieDate = value.date_published;
            let movieRating = value.avg_vote;
            let movieImdbScore = value.imdb_score;
            let movieDirector = value.directors;
            let movieActors = value.actors;
            let movieDuration = value.duration;
            let movieCountries = value.countries;
            let movieIncome = value.worldwide_gross_income;
            let movieDescription = value.description;

            let movieData = {
                "imageUrl": imgUrl,
                "movieTitle": movieTitle,
                "movieGenre": movieGenre,
                "movieDate": movieDate,
                "movieRating": movieRating,
                "movieImdbScore": movieImdbScore,
                "movieDirector": movieDirector,
                "movieActors": movieActors,
                "movieDuration": movieDuration,
                "movieCountries": movieCountries,
                "movieIncome": movieIncome,
                "movieDescription": movieDescription,
            };
            return movieData;
        })
        return movieData;
}

// Function to open Modal and populate Movie Information
async function createModal() {
    let numberOfMoviesImages = document.querySelectorAll(".item img").length;
     for (let i = 0; i < numberOfMoviesImages; i++) {
        document.querySelectorAll(".item img")[i].addEventListener("click", async function () {
        // Retieve Data from API
        let imageId = this.alt;
        let movieData = await movieInfo(imageId);
        console.log(movieData);
        // Create Modal
        let modalDiv = document.getElementById("modal");
        modalDiv.setAttribute("class", "active");

        let divMovieImage = document.querySelector("#modal .info-left .image");
        divMovieImage.src = movieData.imageUrl;
        let divMovieTitle = document.querySelector("#modal .info-right .title");
        divMovieTitle.textContent = movieData.movieTitle;
        let divMovieGenre = document.querySelector("#modal .info-right .genre");
        divMovieGenre.textContent = movieData.movieGenre;
        let divMovieDate = document.querySelector("#modal .info-right .date");
        divMovieDate.textContent = movieData.movieDate;
        let divMovieRating = document.querySelector("#modal .info-right .rating");
        divMovieRating.textContent = movieData.movieRating;
        let divMovieImdbScore = document.querySelector("#modal .info-right .imdb-score");
        divMovieImdbScore.textContent = "Imdb Score: " + movieData.movieImdbScore;
        let divMovieDirector = document.querySelector("#modal .info-right .director");
        divMovieDirector.textContent = movieData.movieDirector;
        let divMovieActors = document.querySelector("#modal .info-right .actors");
        divMovieActors.textContent = movieData.movieActors;
        let divMovieDuration = document.querySelector("#modal .info-right .duration");
        divMovieDuration.textContent = movieData.movieDuration;
        let divMovieCountries = document.querySelector("#modal .info-right .countries");
        divMovieCountries.textContent = movieData.movieCountries;
        let divMovieIncome = document.querySelector("#modal .info-right .income");
        divMovieIncome.textContent = movieData.movieIncome;
        let divMovieDescription = document.querySelector("#modal .info-right .description");
        divMovieDescription.textContent = movieData.movieDescription;
        })
    }
}


// Launch functions
async function mergeFunction() {
    console.log("1");
    const bestMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&page_size=7");
    const bestSciFiMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Sci-Fi&page_size=7")
    const bestAnimationMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Animation&page_size=7");
    const bestComedyImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Comedy&page_size=7")
    console.log(bestMoviesImagesUrls);
    console.log("2");
    const bestMoviesData = await populateCarousel(bestMoviesImagesUrls, "carousel-best-rated-movies");
    const bestSciFiMovieData = await populateCarousel(bestSciFiMoviesImagesUrls, "carousel-best-sci-fi-rated-movies");
    const bestAnimationMovieData = await populateCarousel(bestAnimationMoviesImagesUrls, "carousel-best-animation-rated-movies");
    const bestComedyMovieData = await populateCarousel(bestComedyImagesUrls, "carousel-best-comedy-rated-movies");
    console.log(bestSciFiMovieData);
    console.log("3");
    const test = await createModal();
    console.log("4");
}

mergeFunction("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7");


