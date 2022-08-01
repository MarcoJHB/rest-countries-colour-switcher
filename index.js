const countriesContainer = document.querySelector(".countries");
const search = document.querySelector(".search");

async function getCountries() {
  let url = "https://restcountries.com/v3.1/all";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderCountries() {
  let countries = await getCountries();
  countries.forEach((data) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country");
    countryCard.innerHTML = `
    <div class="country-img">
          <img src="${data.flags.svg}" alt="" />
        </div>
        <div class="country-info">
          <h5>${data.name.common}</h5>
          <p><strong>Population</strong> ${data.population}</p>
          <p><strong>Region</strong> ${data.region}</p>
          <p><strong>Capital</strong> ${data.capital}</p>
        </div>`;
    countriesContainer.appendChild(countryCard);
  });
}

renderCountries();

