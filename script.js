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
      let title = document.createElement("h2");
      title.textContent = movie.title;
      moviesContainer.appendChild(title);

      let poster = document.createElement("img");
      poster.src = movie.image;
      poster.alt = movie.title;
      moviesContainer.appendChild(poster);
    }
    console.log(movies);
  } catch (err) {
    console.log(err);
  }
}

getMovies();
