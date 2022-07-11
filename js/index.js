/* ---------- NAVBAR & CLOSING BUTTON ---------- */
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


// Modal Closing Button
document.getElementById("close").addEventListener("click", function () {
    let modal = document.getElementById("modal");
    modal.classList.replace("active", "deactivate");
})

let nbOfArrows = document.getElementsByClassName("arrow__btn").length;
for (var i=0; i < nbOfArrows; i++) {
    document.getElementsByClassName("arrow__btn")[i].addEventListener("click", function (event){
        //event.preventDefault();
    })
}


/* ---------- GETTING DATA FROM API ---------- */
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

            let data = {
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
            console.log(data);
            return data;
        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        })
    return movieData;
}


// Function to populate Modal
function populateModal(movieData) {
    // Create Modal
    let modalDiv = document.getElementById("modal");
    modalDiv.setAttribute("class", "active");

    let divMovieImage = document.querySelector("#modal .info-left .image");
    divMovieImage.src = movieData.imageUrl;
    let divMovieTitle = document.querySelector("#modal .info-right .title");
    divMovieTitle.textContent = movieData.movieTitle;
    let divMovieGenre = document.querySelector("#modal .info-right .genre");
    divMovieGenre.innerHTML = "<i>Genre: </i>" + "<strong>" + movieData.movieGenre + "</strong>";
    let divMovieDate = document.querySelector("#modal .info-right .date");
    divMovieDate.innerHTML = "<i>Release Date: </i>" + "<strong>" + movieData.movieDate + "</strong>" ;
    let divMovieRating = document.querySelector("#modal .info-right .rating");
    divMovieRating.innerHTML = "<i>Rating: </i>" + "<strong>" + movieData.movieRating + "</strong>";
    let divMovieImdbScore = document.querySelector("#modal .info-right .imdb-score");
    divMovieImdbScore.innerHTML =  "<i>Imdb Score: </i>" + movieData.movieImdbScore + "  " + "<i class=\'fa-solid fa-ranking-star\'></i>";
    let divMovieDirector = document.querySelector("#modal .info-right .director");
    divMovieDirector.innerHTML = "<i>Director: </i>" + "<strong>" + movieData.movieDirector + "</strong>";
    let divMovieActors = document.querySelector("#modal .info-right .actors");
    divMovieActors.innerHTML = "<i>Actors: </i><br>" + "<strong>" + movieData.movieActors + "</strong>";
    let divMovieDuration = document.querySelector("#modal .info-right .duration");
    divMovieDuration.innerHTML = "<i>Duration: </i>" + "<strong>" + movieData.movieDuration + "</strong>";
    let divMovieCountries = document.querySelector("#modal .info-right .countries");
    divMovieCountries.innerHTML = "<i>Countries: </i>" + "<strong>" + movieData.movieCountries + "</strong>";
    let divMovieIncome = document.querySelector("#modal .info-right .income");
    divMovieIncome.innerHTML = "<i>Box Office Revenue: </i>" + "<strong>" + movieData.movieIncome.toLocaleString("en-US") + "</strong>";
    let divMovieDescription = document.querySelector("#modal .info-right .description");
    divMovieDescription.innerHTML = "<i>Synopsis: </i><br>" + movieData.movieDescription;
}


// Function to open Modal and populate Movie Information
async function createModalCarousel() {
    let numberOfMoviesImages = document.querySelectorAll(".item img").length;
    for (let i = 0; i < numberOfMoviesImages; i++) {
        document.querySelectorAll(".item img")[i].addEventListener("click", async function () {
            // Retieve Data from API
            let imageId = this.alt;
            let movieData = await movieInfo(imageId);

            populateModal(movieData);
        })
    }
}

// Function create and populate Modal of the main section button
async function createModalMainButton() {
    document.querySelector(".play").addEventListener("click", async function() {
        let bestMovieMainSectionDiv = document.getElementById("best-movie-image");
        let bestMovieId = bestMovieMainSectionDiv.getAttribute("alt");

        let movieData = await movieInfo(bestMovieId);

        populateModal(movieData);
    })
}


// Function to populate main section
async function populateMainSection() {
    let bestMovieDiv = document.querySelector("#best-rated-movies-first-part div img");
    let bestMovieId = bestMovieDiv.getAttribute("alt");
    let bestMovieData = await movieInfo(bestMovieId);

    let bestMovieImageDiv = document.getElementById("best-movie-image");
    let bestMovieTitle = document.getElementById("best-movie-title");
    let bestMovieDescription = document.getElementById("best-movie-desc");

    bestMovieImageDiv.setAttribute("src", bestMovieData.imageUrl);
    bestMovieImageDiv.setAttribute("alt", bestMovieId);
    bestMovieTitle.textContent = bestMovieData.movieTitle;
    bestMovieDescription.textContent = bestMovieData.movieDescription;

}

// Launch functions
async function mergeFunction() {
    console.log("1");
    const bestMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&page_size=7");
    const bestSciFiMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Sci-Fi&page_size=7");
    const bestAnimationMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Animation&page_size=7");
    const bestComedyImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Comedy&page_size=7");
    console.log("2");
    const bestMoviesData = await populateCarousel(bestMoviesImagesUrls, "carousel-best-rated-movies");
    const bestMovieMainSection = await populateMainSection();
    const bestSciFiMovieData = await populateCarousel(bestSciFiMoviesImagesUrls, "carousel-best-sci-fi-rated-movies");
    const bestAnimationMovieData = await populateCarousel(bestAnimationMoviesImagesUrls, "carousel-best-animation-rated-movies");
    const bestComedyMovieData = await populateCarousel(bestComedyImagesUrls, "carousel-best-comedy-rated-movies");
    console.log("3");
    const modalCarousel = await createModalCarousel();
    console.log("4");
    const modalMainButton = await createModalMainButton();
    console.log(modalMainButton);

}

mergeFunction();


