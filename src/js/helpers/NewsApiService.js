export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log('Before query: ', this);
    // const searchRequest = e.currentTarget.elements.query.value;

    const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&pageSize=5&page=${this.page}&apiKey=48e54ca0458d4c07a6db808cddd7a419`;

    return fetch(url)
      .then((r) => r.json())
      .then(data => {return data});
  }

  incrementPages() {
    this.page += 1;
    return this.fetchArticles();
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
