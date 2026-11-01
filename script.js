let heading = document.querySelector("h1");


let moviesContainer = document.querySelector("#movie-container");

let searchBox = document.querySelector("#movie-search");

let moviesArray = [];

let detailButton = document.querySelector('.detail-button')

let mainView = document.querySelector('#main-view')

let detailView = document.querySelector('#detail-view')

let backBtn = document.getElementById('back-button')

let detailCard = document.getElementById('movie-card')

// moviesContainer.addEventListener('click', function(){
//   document.body.classList.add('detail-active');
//   mainView.style.display = 'none'
//   detailView.style.display = 'block'
// })

backBtn.addEventListener('click', function() {
  document.body.classList.remove('detail-active');
  detailView.style.display = 'none'; 
  mainView.style.display = 'block'
})

async function fetchMovieDetails(id) {
  try {
      let url = `https://ghibliapi.vercel.app/films/${id}`
    let response = await fetch(url)
    let data = await response.json()
    return data

  } catch(err) {
    console.log(err)
  }

}

function displayMovieDetails(movie) {
  detailCard.textContent = ''
  let title = document.createElement('h1')
  title.textContent = movie.title; 
  detailCard.appendChild(title);



}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  if (movies.length === 0) {
    let message = document.createElement("p");
    message.textContent = "No Movies Found";
    moviesContainer.appendChild(message);

    return;
  }

  for (let movie of movies) {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.addEventListener('click', async function() {
      let detailedMovie = await fetchMovieDetails(movie.id)
      displayMovieDetails(detailedMovie); 
     document.body.classList.add('detail-active');
     mainView.style.display = "none";
    detailView.style.display = "block";
      
    })

    let poster = document.createElement("img");
    poster.src = movie.image;
    poster.alt = movie.title;
    movieCard.appendChild(poster);

    let title = document.createElement("h2");
    title.textContent = movie.title;
    movieCard.appendChild(title);

    let releaseDate = document.createElement("p");
    releaseDate.textContent = "Released: " + movie.release_date;
    let rating = document.createElement("p");
    rating.textContent = "Rating: " + movie.rt_score + "%";
    movieCard.append(releaseDate);
    movieCard.append(rating);

    let director = document.createElement("p");
    director.textContent = "Director: " + movie.director;
    movieCard.appendChild(director);

    moviesContainer.appendChild(movieCard);
  }
}

async function getMovies() {
  try {
    let response = await fetch("https://ghibliapi.vercel.app/films");
    if (!response.ok) {
      throw new Error("Error with response");
    }

    let movies = await response.json();
    moviesArray = movies;
    displayMovies(moviesArray);
  } catch (err) {
    console.log(err);
  }
}

getMovies();

searchBox.addEventListener("input", function (e) {
  let searchTerm = e.target.value.toLowerCase();

  let filteredMovies = moviesArray.filter(function (movie) {
    return movie.title.toLowerCase().includes(searchTerm);
  });
  displayMovies(filteredMovies);
});
