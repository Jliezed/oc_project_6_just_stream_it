// Navbar Transparent to Solid on scroll
document.addEventListener("scroll", function() {
    let navbar = document.querySelector(".navbar");
    let scrollDown = window.scrollY;
    if (scrollDown > 100) {
        navbar.classList.add("navbar--solid");
    }
    if (scrollDown < 100) {
        navbar.classList.remove("navbar--solid");
    }

})

// Get Data from API
let urlsToParse = ["http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&year=2020", "http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score&year=2020"];
let urlsBestMovies = [];

// Get Best Movies URLs
function getBestMoviesUrls() {
    for (let url in urlsToParse) {
        fetch(urlsToParse[url])
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value){
                let bestMoviesInfo = value.results;
                for (let movieInfo in bestMoviesInfo) {
                    urlsBestMovies.push(bestMoviesInfo[movieInfo].url);
                }
            })
            .catch(function (err){
                // Une erreur est survenue
                //console.log(err);
            })
    }
    for (let urlMovie in urlsBestMovies) {
        fetch(urlsBestMovies[urlMovie])
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value){
                console.log(value);
            })
    }
}
getBestMoviesUrls();
//console.log(urlsBestMovies.length);








// MODAL
// Modal
// Get the modal
var modal = document.getElementsByClassName("modal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("modal-button");
console.log(btn);
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

