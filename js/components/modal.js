import {movieInfo} from "./api_calls.js";

// Modal Closing Button
function closingButtonModal() {
    document.getElementById("close").addEventListener("click", function () {
        let modal = document.getElementById("modal");
        modal.classList.replace("active", "deactivate");
    })
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
    divMovieDate.innerHTML = "<i>Release Date: </i>" + "<strong>" + movieData.movieDate + "</strong>";
    let divMovieRating = document.querySelector("#modal .info-right .rating");
    divMovieRating.innerHTML = "<i>Rating: </i>" + "<strong>" + movieData.movieRating + "</strong>";
    let divMovieImdbScore = document.querySelector("#modal .info-right .imdb-score");
    divMovieImdbScore.innerHTML = "<i>Imdb Score: </i>" + movieData.movieImdbScore + "  " + "<i class=\'fa-solid fa-ranking-star\'></i>";
    let divMovieDirector = document.querySelector("#modal .info-right .director");
    divMovieDirector.innerHTML = "<i>Director: </i>" + "<strong>" + movieData.movieDirector + "</strong>";
    let divMovieActors = document.querySelector("#modal .info-right .actors");
    divMovieActors.innerHTML = "<i>Actors: </i><br>" + "<strong>" + movieData.movieActors + "</strong>";
    let divMovieDuration = document.querySelector("#modal .info-right .duration");
    divMovieDuration.innerHTML = "<i>Duration: </i>" + "<strong>" + movieData.movieDuration + " minutes</strong>";
    let divMovieCountries = document.querySelector("#modal .info-right .countries");
    divMovieCountries.innerHTML = "<i>Countries: </i>" + "<strong>" + movieData.movieCountries + "</strong>";
    let divMovieIncome = document.querySelector("#modal .info-right .income");
    divMovieIncome.innerHTML = "<i>Box Office Revenue: </i>" + "<strong>" + movieData.movieIncome.toLocaleString("en-US") + "</strong>";
    let divMovieDescription = document.querySelector("#modal .info-right .description");
    divMovieDescription.innerHTML = "<i>Synopsis: </i><br>" + movieData.movieDescription;
}

// Function create and populate Modal of the main section button
async function createModalMainButton(moviesUrlsId) {
    document.querySelector(".play").addEventListener("click", async function () {

        let movieData = await movieInfo(moviesUrlsId[0].movieId);

        populateModal(movieData);
    })
}

// Function to open Modal and populate Movie Information
async function createModalCarousel() {
    let numberOfMoviesImages = document.querySelectorAll(".slide img").length;
    for (let i = 0; i < numberOfMoviesImages; i++) {
        document.querySelectorAll(".slide img")[i].addEventListener("click", async function () {
            // Retieve Data from API
            let imageId = this.alt;
            let movieData = await movieInfo(imageId);

            populateModal(movieData);
        })
    }
}

export {closingButtonModal, populateModal, createModalMainButton, createModalCarousel};