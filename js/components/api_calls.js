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


export {getImagesUrls, movieInfo}