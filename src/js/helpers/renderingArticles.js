export default function testRender(data) {
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
