const countriesContainer = document.querySelector('.countries');
const dropDown = document.querySelector('.dropDown');
const dropElem = document.querySelector('.drop');
const countryCodes = [];
const region = document.querySelectorAll('.region');
const search = document.querySelector('.search');
const toggle = document.querySelector('.toggle');
const moon = document.querySelector('.moon');
const regionFilterText = document.querySelector('.region-filter');

async function getCountries() {
  let url = 'https://restcountries.com/v3.1/all';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
  console.log(data);
}

async function renderCountries() {
  let countries = await getCountries();
  let countryCodeObj = {};
  countries
    .sort((a, b) => {
      const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    })
    .forEach((data) => {
      const countryCard = document.createElement('div');
      countryCard.classList.add('country');
      countryCard.innerHTML = `
    <div class="country-img">
          <img src="${data.flags.svg}" alt="" />
        </div>
        <div class="country-info">
          <h5 class="countryName">${data.name.common}</h5>
          <p><strong>Population</strong> ${data.population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p class="regionName"><strong>Region</strong> ${data.region}</p>
          <p><strong>Capital</strong> ${data.capital}</p>
        </div>`;
      countriesContainer.appendChild(countryCard);
      countryCodeObj.code = data.cca3;
      countryCodes.push({ code: data.cca3, country: data.name.common });
      // console.log(data);
      countryCard.addEventListener('click', () => {
        showCountryDetail(data);
      });
    });
}

renderCountries();

dropDown.addEventListener('click', () => {
  dropElem.classList.toggle('showDropDown');
});

const regionName = document.getElementsByClassName('regionName');
const countryName = document.getElementsByClassName('countryName');

region.forEach((element) => {
  element.addEventListener('click', () => {
    Array.from(regionName).forEach((elem) => {
      if (elem.innerText.includes(element.innerText) || element.innerText == 'All') {
        elem.parentElement.parentElement.style.display = 'grid';
        regionFilterText.innerText = element.innerText;
      } else {
        elem.parentElement.parentElement.style.display = 'none';
      }
    });
    dropElem.classList.toggle('showDropDown');
  });
});

search.addEventListener('input', () => {
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = 'grid';
    } else {
      elem.parentElement.parentElement.style.display = 'none';
    }
  });
});

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  moon.classList.toggle('fas');
});

const countryModal = document.querySelector('.countryModal');
const countries = document.querySelector('.countries');
const filterSearch = document.querySelector('.filter-search');
const borders = [];

function showCountryDetail(data) {
  countryModal.classList.toggle('show');
  countries.classList.toggle('show');
  filterSearch.classList.toggle('show');
  function getNativeName() {
    let nativeName = Object.entries(data.name.nativeName).map(([k, v]) => v.common);
    return nativeName[0];
  }

  function getBorderCountries() {
    return Object.values(data.borders).map(function (code) {
      return `<p class="btn country-border">${
        countryCodes.find((o) => o.code === code).country
      }</p>`;
    });
  }

  countryModal.innerHTML = `<button class="back">Back</button>
  <div class="modal">
    <div class="leftModal">
      <img src="${data.flags.svg}" alt="" />
    </div>
    <div class="rightModal">
      <h1>${data.name.common}</h1>
      <div class="modal-info">
        <div class="innerLeft inner">
          <p><strong>Native Name:</strong> ${getNativeName()}</p>
          <p><strong>Population:</strong> ${data.population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p><strong>Region:</strong> ${data.region}</p>
          <p><strong>Sub Region:</strong> ${data.subregion}</p>
        </div>
        <div class="innerRight inner">
        <p><strong>Capital:</strong> ${data.capital}</p>
          <p><strong>Top Level Domain:</strong> ${Object.values(data.tld)}</p>
          <p><strong>Currencies:</strong> ${Object.entries(data.currencies).map(
            ([key, currName]) => currName.name
          )}</p>
          <p><strong>Languages:</strong> ${Object.values(data.languages).join(', ')}</p>
        </div>
      </div>
    <div class="borders-section"><p><strong>Border Countries: </strong>${getBorderCountries().join(
      ' '
    )}</p></div>

    </div>
  </div>`;

  const back = countryModal.querySelector('.back');
  back.addEventListener('click', () => {
    countryModal.classList.toggle('show');
    countries.classList.toggle('show');
    filterSearch.classList.toggle('show');
  });

  const countryBorder = document.querySelector('.country-border');
  countryBorder.addEventListener('click', () => {
    showCountryDetail(data);
  });
}
