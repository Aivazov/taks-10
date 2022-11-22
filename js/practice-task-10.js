// import '../css/styles.css';
import fetchCountries from './helpers/fetchCountries.js';

const searchBox = document.querySelector('#search-box');
const searchForm = document.querySelector('#search-form');
const profileContainer = document.querySelector('.js-contries-container');
searchBox.addEventListener('input', _.debounce(fetchIntoInput, 300));

function fetchIntoInput(e) {
  e.preventDefault();
  profileContainer.innerHTML = '';

  const searchRequest = e.target.value;
  console.dir(searchRequest);

  fetchCountries(searchRequest)
    .then((data) => {
      console.log(data.length);
      if (data.length > 4) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1) {
        data.map((m) => {
          renderPreviewOfCountries(m);
        });
      } else {
        data.map((m) => {
          renderCountry(m);
        });
      }
    })
    .catch((error) =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchRequest = searchBox.value;
  console.dir(searchForm);
  Notiflix.Notify.success(searchRequest);

  fetchCountries(searchRequest).then(testRender);
  searchForm.reset();
});

function renderCountry(data) {
  const langs = Object.values(data.languages).join(', ');

  const markup = `
    <img src='${data.flags.svg}' width='32'  />
    <h1 class='img-of-country'>${data.name.official}</h1>
    <p><strong>Capital:</strong> ${data.capital}</p>
    <p><strong>Population:</strong> ${data.population}</p>
    <p><strong>Languages:</strong> ${langs}</p>
  `;

  profileContainer.insertAdjacentHTML('beforeend', markup);
}

function renderPreviewOfCountries(data) {
  // const langs = Object.values(data.languages).join(', ');

  const markup = `
    <img src='${data.flags.svg}' width='24'  />
    <h1 class='img-of-country' style="font-size: 24px;">${data.name.common}</h1>
    <br>
  `;

  profileContainer.insertAdjacentHTML('beforeend', markup);
}

// function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}`).then((r) =>
//     r.json()
//   );
// }
