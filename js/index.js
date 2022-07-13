import {navabarTransparent, menuBurger} from "./components/navbar.js";
import {closingButtonModal, populateModal, createModalMainButton, createModalCarousel} from "./components/modal.js";
import {arrowCarousel, populateCarousel} from "./components/carousel.js";
import {getImagesUrls, movieInfo} from "./components/api_calls.js";
import {populateMainSection} from "./components/main_section.js";


navabarTransparent();
menuBurger();
closingButtonModal();





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
}

mergeFunction();