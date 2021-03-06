// Function to populate main section
import {movieInfo} from "./api_calls.js";

async function populateMainSection(moviesUrlsId) {
    let movieData = moviesUrlsId[0];
    console.log(movieData)
    let bestMovieDiv = document.querySelector("#carousel-best-rated-movies div img");
    let bestMovieId = bestMovieDiv.getAttribute("alt");
    let bestMovieData = await movieInfo(movieData.movieId);
    console.log(bestMovieData)

    let bestMovieImageDiv = document.getElementById("best-movie-image");
    let bestMovieTitle = document.getElementById("best-movie-title");
    let bestMovieDescription = document.getElementById("best-movie-desc");

    bestMovieImageDiv.setAttribute("src", bestMovieData.imageUrl);
    bestMovieImageDiv.setAttribute("alt", bestMovieId);
    bestMovieTitle.textContent = bestMovieData.movieTitle;
    bestMovieDescription.textContent = bestMovieData.movieDescription;
}

export {populateMainSection};