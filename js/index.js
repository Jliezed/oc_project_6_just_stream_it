import {navabarTransparent, menuBurger} from "./components/navbar.js";
import {closingButtonModal, populateModal, createModalMainButton, createModalCarousel} from "./components/modal.js";
import {toggleCarousel, populateCarousel} from "./components/carousel.js";
import {getImagesUrls, movieInfo} from "./components/api_calls.js";
import {populateMainSection} from "./components/main_section.js";


navabarTransparent();
menuBurger();
closingButtonModal();
toggleCarousel();


function arrowCarousel(carouselId) {
    let carouselDiv = document.getElementById(carouselId);
    // Select all slides
    const slider = carouselDiv.querySelectorAll(".slide");

    // loop through slides and set each slides translateX
    slider.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

    // select next slide button
    const nextSlide = carouselDiv.querySelector(".btn-right");

    // current slide counter
    let curSlide = 0;
    // maximum number of slides
    let maxSlide = slider.length - 1;

    // add event listener and navigation functionality
    nextSlide.addEventListener("click", function () {
        // check if current slide is the last and reset current slide
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        //   move slide by -100%
        slider.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    });

    // select next slide button
    const prevSlide = carouselDiv.querySelector(".btn-left");

    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
        // check if current slide is the first and reset current slide to last
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }
        //   move slide by 100%
        slider.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    });
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
    const bestSciFiMoviesData = await populateCarousel(bestSciFiMoviesImagesUrls, "carousel-best-sci-fi-rated-movies");
    const bestAnimationMoviesData = await populateCarousel(bestAnimationMoviesImagesUrls, "carousel-best-animation-rated-movies");
    const bestComedyMoviesData = await populateCarousel(bestComedyImagesUrls, "carousel-best-comedy-rated-movies");
    const bestMovieMainSection = await populateMainSection();
    console.log("3 bis");
    arrowCarousel("carousel-best-rated-movies");
    arrowCarousel("carousel-best-sci-fi-rated-movies");
    arrowCarousel("carousel-best-animation-rated-movies");
    arrowCarousel("carousel-best-comedy-rated-movies");
    console.log("3");
    const modalCarousel = await createModalCarousel();
    console.log("4");
    const modalMainButton = await createModalMainButton();
    console.log(modalMainButton);
    arrowCarousel()

}

mergeFunction();