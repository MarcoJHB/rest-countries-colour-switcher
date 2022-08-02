const countriesContainer = document.querySelector('.countries');
const dropDown = document.querySelector('.dropDown');
const dropElem = document.querySelector('.drop');
const region = document.querySelectorAll('.region');
const search = document.querySelector('.search');
const toggle = document.querySelector('.toggle');
const moon = document.querySelector('.moon');

async function getCountries() {
  let url = 'https://restcountries.com/v3.1/all';
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
    const countryCard = document.createElement('div');
    countryCard.classList.add('country');
    countryCard.innerHTML = `
    <div class="country-img">
          <img src="${data.flags.svg}" alt="" />
        </div>
        <div class="country-info">
          <h5 class="countryName">${data.name.common}</h5>
          <p><strong>Population</strong> ${data.population}</p>
          <p class="regionName"><strong>Region</strong> ${data.region}</p>
          <p><strong>Capital</strong> ${data.capital}</p>
        </div>`;
    countriesContainer.appendChild(countryCard);
    countryCard.addEventListener('click', () => {
      showCountryDetail();
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
      } else {
        elem.parentElement.parentElement.style.display = 'none';
      }
    });
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

const backBtn = document.querySelector('.back');
const countryModal = document.querySelector('.countryModal');

backBtn.addEventListener('click', () => {
  countryModal.classList.toggle('show');
});

function showCountryDetail() {
  countryModal.classList.toggle('show');
  countryModal.innerHTML = `<button class="back">Back</button>
  <div class="modal">
    <div class="leftModal">
      <img src="" alt="" />
    </div>
    <div class="rightModal">
      <h1>Germany</h1>
      <div class="country-info">
        <div class="innerLeft inner">
          <p><strong>Native Name:</strong> Belgie</p>
          <p><strong>Population:</strong> Belgie</p>
          <p><strong>Region:</strong> Belgie</p>
          <p><strong>Sub Region:</strong> Belgie</p>
          <p><strong>Capital:</strong> Belgie</p>
        </div>
        <div class="innerRight inner">
          <p><strong>Top Level Domain:</strong> Belgie</p>
          <p><strong>Currencies:</strong> Belgie</p>
          <p><strong>Languages:</strong> Belgie</p>
        </div>
      </div>
    </div>
  </div>`;
}
