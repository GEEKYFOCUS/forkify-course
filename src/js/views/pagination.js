import View from './view.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2
class PaginationView extends View {

  _parentEl = document.querySelector('.pagination');
  _generateMarkup() {
    const curPage = this._data.page


    // there are four scenerio
    const numPage = Math.ceil((this._data.results.length / this._data.resultsPerPage))



    // page 1, and there is other pages
    if (curPage === 1 && numPage > 1) {
      return ` 
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `
    }

    // last page
    if (curPage === numPage && numPage > 1) {
      return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`
    }


    //  Other pages
    if (curPage < numPage) {
      return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `
    }
    d
    // page 1,  and  there is No other page

    return ``

  }
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline")
      if (!btn) return
      const gotoPage = +btn.dataset.goto
      handler(gotoPage)
    })
  }
}
export default new PaginationView()