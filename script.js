let heading = document.querySelector("h1");
console.log(heading);

let moviesContainer = document.querySelector("#movie-container");

async function getMovies() {
  try {
    let response = await fetch("https://ghibliapi.vercel.app/films");
    if (!response.ok) {
      throw new Error("Error with response");
    }

    let movies = await response.json();
    for (let movie of movies) {
      let movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      let title = document.createElement("h2");
      title.textContent = movie.title;
      movieCard.appendChild(title);

      let poster = document.createElement("img");
      poster.src = movie.image;
      poster.alt = movie.title;
      movieCard.appendChild(poster);

      let releaseDate = document.createElement("p");
      releaseDate.textContent = "Released: " + movie.release_date;
      let rating = document.createElement("p");
      rating.textContent = "Rating: " + movie.rt_score + "%";
      movieCard.append(releaseDate);
      movieCard.append(rating);

      moviesContainer.appendChild(movieCard);
    }
    console.log(movies);
  } catch (err) {
    console.log(err);
  }
}

getMovies();
