import View from './view.js';
import previewView from "./previewView.js"
import icons from 'url:../../img/icons.svg'; //Parcel 2
class BookmarkView extends View {
    _parentEl = document.querySelector('.bookmarks');
    _errorMessage = "No bookmark yet. Find a nice recipe and bookmark it. ;) ";
    _message = ""
    _generateMarkup() {
        return this._data.map((bookmark) => previewView.render(bookmark, false)).join("");
    }

}

export default new BookmarkView();
