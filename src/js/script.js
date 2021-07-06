{
  'use strict';

  // Ćwiczenie nr 1.
  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    booksTemplate:
      Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  function render() {
    for(let book of dataSource.books) {
      const generatedHTML = templates.booksTemplate(book);
      book.element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(book.element);
    }
  }

  render();

  // Ćwiczenie nr 2
  // Ćwiczenie nr 3
  // Ćwiczenie nr 4 -> PROBLEM
  const favoriteBooks = [];

  function initActions() {
    const booksContainer = document.querySelector(select.containerOf.booksList);

    booksContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();
      console.log(event.target.offsetParent);

      if(event.target.offsetParent.classList.contains('book__image')){

        const bookImage = event.target.offsetParent;
        const isFavorite = bookImage.classList.contains('favorite');
        console.log(isFavorite);

        if(!isFavorite) {
          bookImage.classList.add('favorite');
          const id = event.target.getAttribute('data-id');
          favoriteBooks.push(id);
        } else {
          bookImage.classList.remove('favorite');
        }
      }
    });
  }

  initActions();
}
