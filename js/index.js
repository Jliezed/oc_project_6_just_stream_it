import {navbarTransparent, menuBurger} from "./components/navbar.js";
import {getImagesUrls} from "./components/api_calls.js";
import {activeArrowCarousel, populateCarousel} from "./components/carousel.js";
import {populateMainSection} from "./components/main_section.js";
import {closingButtonModal, createModalMainButton, createModalCarousel} from "./components/modal.js";



navbarTransparent();
menuBurger();
closingButtonModal();


// Launch functions
async function mergeFunctions() {
    // Get Images URLs from API
    let bestMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&page_size=8");
    let bestMovieMainSection = bestMoviesImagesUrls.slice(0);
    let bestMovieOtherForCarousel = bestMoviesImagesUrls.slice(1,8)
    const bestSciFiMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Sci-Fi&page_size=7");
    const bestAnimationMoviesImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Animation&page_size=7");
    const bestComedyImagesUrls = await getImagesUrls("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=Comedy&page_size=7");
    // Populate Carousels
    await populateCarousel(bestMovieOtherForCarousel, "carousel-best-rated-movies");
    await populateCarousel(bestSciFiMoviesImagesUrls, "carousel-best-sci-fi-rated-movies");
    await populateCarousel(bestAnimationMoviesImagesUrls, "carousel-best-animation-rated-movies");
    await populateCarousel(bestComedyImagesUrls, "carousel-best-comedy-rated-movies");
    // Populate Main Section Image
    await populateMainSection(bestMoviesImagesUrls);
    // Active arrows of all carousels
    activeArrowCarousel();
    // Active Modal
    await createModalCarousel();
    await createModalMainButton(bestMovieMainSection);
}

mergeFunctions();
