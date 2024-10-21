import fetchData from "./data.js";

const button = document.getElementById("btnBuscar");
const input = document.getElementById("inputBuscar");

const createStars = (vote_average) => {
  const starCount = Math.round(vote_average / 2);
  return "★".repeat(starCount) + "☆".repeat(5 - starCount);
};

const displayGenres = (genres) => genres.map((genre) => genre.name).join(", ");
const searchFunction = async (value) => {
  const films = await fetchData();
  value = value.toLowerCase();

  return films.filter(
    (film) =>
      film.title?.toLowerCase().includes(value) ||
      film.tagline?.toLowerCase().includes(value) ||
      film.overview?.toLowerCase().includes(value) ||
      film.genres?.some((genre) => genre.name.toLowerCase().includes(value))
  );
};

const displayResults = (films) => {
  const resultsContainer = document.getElementById("lista");
  resultsContainer.innerHTML = "";
  films.forEach((film) => {
    const filmElement = `
            <li class="list-group-item mb-3" style="border: none; padding: 15px; background-color: transparent;">
                <div class="container-gral">
                    <div class="container-titletag">
                        <div class="title-tagline">
                            <h5>${film.title}</h5>
                            <p>${film.tagline}</p>
                        </div>
                        <span class="ms-auto text-warning stars">
                            ${createStars(film.vote_average)}
                        </span>
                    </div>
                    <div class="dropdown botoncito">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            More Info
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><span class="dropdown-item">Year: ${new Date(
                              film.release_date
                            ).getFullYear()}</span></li>
                            <li><span class="dropdown-item">Runtime: ${
                              film.runtime
                            } minutes</span></li>
                            <li><span class="dropdown-item">Budget: $${film.budget.toLocaleString()}</span></li>
                            <li><span class="dropdown-item">Revenue: $${film.revenue.toLocaleString()}</span></li>
                        </ul>
                    </div>
                    <div class="details-container d-none p-3 mt-2 rounded">
                        <span>Overview:</span> <p>${film.overview}</p>
                        <span>Genres:</span> <p>${displayGenres(
                          film.genres
                        )}</p>
                    </div>
                </div>
            </li>
        `;
    resultsContainer.innerHTML += filmElement;
  });
  document.querySelectorAll(".title-tagline h5").forEach((title) => {
    title.addEventListener("click", (e) => {
      const detailsContainer = e.target
        .closest(".container-gral")
        .querySelector(".details-container");
      detailsContainer.classList.toggle("d-none");
    });
  });
};
const handleSearch = async () => {
  const value = input.value.trim();
  if (value) {
    const results = await searchFunction(value);
    displayResults(results);
  }
};

button.addEventListener("click", handleSearch);
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
