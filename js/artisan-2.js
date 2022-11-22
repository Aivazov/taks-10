// import '../css/styles.css';

const searchBox = document.querySelector('#search-box');
const searchForm = document.querySelector('#search-form');
const profileContainer = document.querySelector('.js-profile-container');


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();


  const searchRequest = searchForm.elements.name.value;

  fetchUser(searchRequest).then((data) => {
    console.log(data);
    renderUser(data)
  });
  searchForm.reset();
});

// avatar_url
// name
// location
// bio
// public_repos
// followers

function fetchUser(user) {
  return fetch(`https://api.github.com/users/${user}`)
    .then((r) => r.json());
}

function renderUser(data) {
  profileContainer.innerHTML = `<img src="${data.avatar_url}" />
  <div>${data.bio ? `<div>${data.bio}</div>` : 'No bio was given'}</div>
  <div>${
    data.location ? `<div>${data.location}</div>` : 'No location was given'
  }</div>
  `;
}