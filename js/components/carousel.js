let maxScrollSlider;

function checkMediaQuery() {
    if (window.matchMedia("(max-width: 676px)").matches) {
        return maxScrollSlider = 2;
    } else if (window.matchMedia("(max-width: 1023)").matches) {
        return maxScrollSlider = 3;
    } else {
        return maxScrollSlider = 4;
    }
}

checkMediaQuery()

// Function to populate Carousel from Movies' URLs
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

// Function to activate arrows of Carousel
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
    let maxSlide = slider.length - maxScrollSlider;
    console.log(slider.length)
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

// Function to activate the function Arrow Carousel
function activeArrowCarousel() {
    let nbOfCarousels = document.querySelectorAll("section.carousel").length;
    for (let i = 0 ; i <nbOfCarousels; i++) {
        let carouselId = document.querySelectorAll("section.carousel")[i];
        let carouselIdName = carouselId.getAttribute("id");
        arrowCarousel(carouselIdName);
    }
}

export {activeArrowCarousel, arrowCarousel, populateCarousel}