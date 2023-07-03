import View from './view.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2
class addRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    _message = `Recipe was successfully uploaded :)`

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector(".nav__btn--add-recipe")
    _btnClose = document.querySelector(".btn--close-modal")
    constructor() {
        super()
        this._addHandlerShowRecipe()
        this._addHandlerHideRecipe()
    }
    toggleWindow() {
        this._overlay.classList.toggle("hidden")
        this._window.classList.toggle("hidden")
    }

    _addHandlerShowRecipe() {
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this))


    }
    _addHandlerHideRecipe() {
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this))
        this._overlay.addEventListener("click", this.toggleWindow.bind(this))
    }
    addHandlerUpload(handler) {
        this._parentEl.addEventListener("submit", function (e) {
            e.preventDefault();
            const dataArray = [... new FormData(this)]
            const data = Object.fromEntries(dataArray)
            console.log(data)
            handler(data)

        })
    }
    _generateMarkup() { }
}


export default new addRecipeView();
