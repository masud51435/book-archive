document.getElementById('error-message').style.display = 'none';
//////////// book Search area ////////////
const searchBook = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  searchField.value = '';

  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data));
}

///////////// error function ////////////
const displayError = () => {
  document.getElementById('error-message').style.display = 'block';
  document.getElementById('search-result').textContent = '';
  document.getElementById('book-numbers').textContent = '';
}

///////////// book search result //////////
const displaySearchResult = books => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  const bookList = books.docs;

  /////////// error massage condition /////////
  if (bookList.length === 0) {
    displayError();
  }
  else {
    document.getElementById('error-message').style.display = 'none';
    //////////// Results found //////////////
    document.getElementById('book-numbers').innerText = `Books Found ${books.numFound}`;
    /////// Retrieve each book and display in a card ///////
    bookList.forEach(book => {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
       <div class="card h-100 text-center">
         <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" style ='height: 350px' class="card-img-top img-thumbnail" alt="...">
         <div class="card-body">
            <h4 class="card-title">${book.title}</h4>
            <h6 class="card-title">Author: ${book.author_name}</h6>
            <p class="card-text">first publish: ${book.first_publish_year}.</p>
            <p class="card-text">publisher: ${book.publisher}.</p>
         </div>
       </div>
     `;
      searchResult.appendChild(div);
    });
  };
};


