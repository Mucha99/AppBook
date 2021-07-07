{
  'use strict';

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

  class BooksList {
    constructor () {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.filterContainer = document.querySelector(select.containerOf.form);

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      const thisBooksList = this;

      for(let book of dataSource.books) {

        const ratingBcg = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = ratingBcg * 10;
        book.ratingBgc = ratingBcg;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.booksTemplate(book);
        book.element = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.booksList);
        booksContainer.appendChild(book.element);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.booksContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();

        if(event.target.offsetParent.classList.contains('book__image')){

          const bookImage = event.target.offsetParent;
          const isFavorite = bookImage.classList.contains('favorite');

          if(!isFavorite) {
            bookImage.classList.add('favorite');
            const id = event.target.getAttribute('data-id');
            thisBooksList.favoriteBooks.push(id);
          } else {
            bookImage.classList.remove('favorite');
          }
        }
      });

      thisBooksList.filterContainer.addEventListener('change', function(event) {
        event.preventDefault();

        const clickBox = event.target;
        if
        (
          clickBox.tagName === 'INPUT' &&
          clickBox.type === 'checkbox' &&
          clickBox.name === 'filter'
        ) {
          if (clickBox.checked === true) {
            thisBooksList.filters.push(clickBox.value);
          } else {
            const indexFilter = thisBooksList.filters.indexOf(clickBox.value);
            thisBooksList.filters.splice(indexFilter, 1);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for(let elem of dataSource.books) {
        let shouldBeHidden = false;
        for(let filter of thisBooksList.filters) {
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

    determineRatingBgc(rating){

      if(rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }else if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
    }
  }

  const app = new BooksList();
  app();
}
