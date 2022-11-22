import '../css/styles.css';
// import articlesTpl from './helpers/articles.hbs';
import NewsApiService from './helpers/NewsApiService';
import { moveToTheTop } from './helpers/moveTopBtn';

// import renderingArticlesFrom from './helpers/renderingArticles.js';

// import {  } from "/helpers/NewsApiService";

// Repeta https://youtu.be/poxVZxvONF8?t=2515

// fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(r => {return r.json(}).then(p => console.log(p)));

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('#search-box'),
  articlesContainer: document.querySelector('.js-articles-container'),
  submitBtn: document.querySelector('button[data-button]'),
  loadMoreBtn: document.querySelector('button[data-load-more]'),
  moveTopBtn: document.querySelector('button[data-move-top]'),
};

const newsApiService = new NewsApiService();

refs.loadMoreBtn.disabled = true;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.moveTopBtn.addEventListener('click', moveToTheTop);

function onSearch(e) {
  e.preventDefault();
  // console.log(refs.searchInput.elements.value);

  clearArticles();
  refs.loadMoreBtn.disabled = false;
  // console.log(e.currentTarget.elements.query.value);

  // const searchRequest = e.currentTarget.elements.query.value;
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    refs.loadMoreBtn.disabled = true;
    return;
  }

  newsApiService.resetPage();
  newsApiService.fetchArticles().then((data) => {
    testRender(data);
  });

  refs.searchForm.reset();

  // const url =
  //   `https://newsapi.org/v2/everything?q=${searchRequest}&pageSize=5&page=1&apiKey=48e54ca0458d4c07a6db808cddd7a419`;

  // fetch(url)
  //   .then((r) => r.json())
  //   .then(console.log);
}

function onLoadMore(e) {
  // newsApiService.page += 1;
  // newsApiService.fetchArticles();
  newsApiService.incrementPages().then((data) => {
    testRender(data);
  });
}

function testRender(data) {
  for (let i = 0; i < data.articles.length; i += 1) {
    const markup = `
     <li>
       <a href='${data.articles[i].url}' target="_blank" rel="noopener noreferrer">
         <article>
           <img src="${data.articles[i].urlToImage}" alt="" width="480" />
           <h2>${data.articles[i].title}</h2>
           <p>Posted By: ${data.articles[i].author}</p>
           <p>${data.articles[i].description}</p>
         </article>
       </a>
     </li>
     `;

    refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
  }
}

function clearArticles() {
  refs.articlesContainer.innerHTML = '';
}

//================TEST SCRIPT===================

function renderArticles([data]) {
  const markup = `
  <li>
    <a href='${data.articles.url}' target="_blank" rel="noopener noreferrer">
      <article>
        <img src="${data.articles.urlToImage}" alt="" width="480" />
        <h2>gbl</h2>
        <p>Posted By: ${data.articles.author}</p>
        <p>${data.articles.description}</p>
      </article>
    </a>
  </li>
  `;

  // const markup = `
  // <li>
  //   <a href='${url}' target="_blank" rel="noopener noreferrer">
  //     <article>
  //       <img src="${urlToImage}" alt="" width="480" />
  //       <h2>gbl</h2>
  //       <p>Posted By: ${author}</p>
  //       <p>${description}</p>
  //     </article>
  //   </a>
  // </li>
  // `;

  refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
}

// const url =
//   'https://newsapi.org/v2/everything?q=cat&pageSize=5&page=1&apiKey=48e54ca0458d4c07a6db808cddd7a419';

// const url2 =
//   'https://newsapi.org/v2/everything?q=dog&pageSize=5&page=1&apiKey=48e54ca0458d4c07a6db808cddd7a419';

// const url3 =
//   'https://newsapi.org/v2/everything?q=dog&apiKey=48e54ca0458d4c07a6db808cddd7a419';

// fetch(url)
//   .then((r) => r.json())
//   .then(console.log);

// fetch(url2)
//   .then((r) => r.json())
//   .then(console.log);

// fetch(url3)
//   .then((r) => r.json())
//   .then(console.log);
