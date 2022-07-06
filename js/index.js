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


// Get Best Movies URLs
async function getBestMoviesUrls() {
    await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&&page_size=7")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (value){
            // console.log(value);
            dictMovies = value.results;
            let moviesUrls = []
            for (i in dictMovies) {
                movieUrl = dictMovies[i].url;
                moviesUrls.push(movieUrl);
            }
            return moviesUrls;
        })
        .then(function(data){
            console.log(data);
            return data;
        })
        .catch(function (err){
            // Une erreur est survenue
            //console.log(err);
        })
}

async function mergeFunction() {
    const data = await getBestMoviesUrls();
    return data
}

console.log(mergeFunction());









// MODAL
// Modal
// Get the modal
var modal = document.getElementsByClassName("modal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("modal-button");
//console.log(btn);
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

