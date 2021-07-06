{
  'use strict';

  // Ćwiczenie nr 1.
  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
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
  // Ćwiczenie nr 4
  const favoriteBooks = [];
  const filters = [];

  function initActions() {
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const filterContainer = document.querySelector(select.containerOf.form);

    booksContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();
      console.log(event.target.offsetParent);

      if(event.target.offsetParent.classList.contains('book__image')){

        const bookImage = event.target.offsetParent;
        const isFavorite = bookImage.classList.contains('favorite');

        if(!isFavorite) {
          bookImage.classList.add('favorite');
          const id = event.target.getAttribute('data-id');
          favoriteBooks.push(id);
        } else {
          bookImage.classList.remove('favorite');
        }
      }
    });

    filterContainer.addEventListener('change', function(event) {
      event.preventDefault();

      const clickBox = event.target;
      if
      (
        clickBox.tagName === 'INPUT' &&
        clickBox.type === 'checkbox' &&
        clickBox.name === 'filter'
      ) {
        if (clickBox.checked === true) {
          filters.push(clickBox.value);
          console.log(filters);
        } else {
          const indexFilter = filters.indexOf(clickBox.value);
          filters.splice(indexFilter, 1);
          console.log(filters);
        }
      }
      filterBooks();
    });
  }

  function filterBooks() {
    for(let elem of dataSource.books) {
      let shouldBeHidden = false;
      for(let filter of filters) {
        if(!elem.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        bookCover.classList.add('hidden');
      } else {
        const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        bookCover.classList.remove('hidden');
      }
    }
  }

  initActions();
}
