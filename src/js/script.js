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
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(book.element);
    }
  }

  render();

  // Ćwiczenie nr 2.
  const favoriteBooks = [];

  function initActions() {
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');

    for(let image of booksImage){
      image.addEventListener('dblclick', function(event) {
        event.preventDefault();
        image.classList.add('favorite');
        const id = image.getAttribute('data-id');
        favoriteBooks.push(id);
      });
    }
  }

  initActions();
}
