// Carousel Toggle

function toggleCarousel() {
    let nbOfArrow = document.getElementsByClassName("arrow").length;
    let arrows = document.getElementsByClassName("arrow");
    for (let i = 0; i < nbOfArrow; i++) {
        arrows[i].addEventListener("click", function (event) {
            let arrowParentElement = arrows[i].parentElement.parentElement.parentElement;
            let slides = arrowParentElement.getElementsByClassName("slides");
            let nbOfSlides = arrowParentElement.getElementsByClassName("slides").length;
            for (let i = 0; i < nbOfSlides; i++) {
                slides[i].classList.toggle("deactivate");
            }

        })
    }
}


// Function to populate a carousel using a list of URLs' images and the ID of the carousel to populate
// async function populateCarousel(moviesUrlsId, carouselId) {
//     let numberOfDivItem = document.querySelectorAll("#" + carouselId + " .item").length - 1;
//
//     for (let i = 0; i < numberOfDivItem; i++) {
//         let getDiv = document.querySelectorAll("#" + carouselId + " .item")[i];
//         let movieData = moviesUrlsId[i];
//         let img = document.createElement("img");
//         img.setAttribute("src", movieData.movieUrl);
//         img.setAttribute("alt", movieData.movieId);
//         getDiv.appendChild(img);
//     }
// }

// POPULATE CAROUSEL FINAL VERSION
async function populateCarousel(moviesUrlsId, carouselId) {
    for (let i = 0; i < moviesUrlsId.length; i++) {
        let divSlide = document.createElement("div");
        divSlide.classList.add("slide");

        let movieData = moviesUrlsId[i];
        let img = document.createElement("img");
        img.setAttribute("src", movieData.movieUrl);
        img.setAttribute("alt", movieData.movieId);
        divSlide.appendChild(img);

        let carouselDiv = document.getElementById(carouselId);
        carouselDiv.appendChild(divSlide);
    }
}

export {toggleCarousel, populateCarousel}