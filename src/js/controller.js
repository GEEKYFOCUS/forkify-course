// import *  as model from "./model.js"
// import { MODAL_CLOSE_SEC } from "./config.js"
// import recipeView from "./views/recipeView.js"
// import resultsView from "./views/resultsView.js"
// import searchView from "./views/searchView.js"
// import paginationView from "./views/pagination.js"
// import bookmarksView from "./views/bookmarkView.js"
// import addRecipeView from "./views/addRecipeView.js"

// import "core-js/stable"
// import "regenerator-runtime/runtime"

// console.log(model.state)

// const recipeContainer = document.querySelector('.recipe');

// console.log('Tab')
// // if (module.hot) {
// //   module.hot.accept()
// // }


// // https://forkify-api.herokuapp.com/v2


// ///////////////////////////////////////
// const controlRecipes = async function () {

//   try {
//     const id = window.location.hash.slice(1)
//     if (!id) return;

//     recipeView.renderSpinner()
//     //0. update result to mark selected search result
//     resultsView.update(model.getSearchResultsPage())
//     bookmarksView.update(model.state.bookmarks)
//     // 1. Loading Recipe
//     // const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`)
//     await model.loadRecipe(id);

//     // 3) Rendering recipe
//     recipeView.render(model.state.recipe);


//   } catch (err) {
//     console.log(err)
//     recipeView.renderError()
//   }
// }

// const controlSearch = async function () {
//   try {


//     // 1. Get query code
//     const query = await searchView.getQuery()
//     if (!query) return;

//     resultsView.renderSpinner()
//     // const data = model.state.search.results

//     // 2. load search result
//     await model.loadSearchResults(query)
//     // console.log(model.state.search.results)


//     // 3. render search result

//     // resultsView.render(model.state.search.results)
//     resultsView.render(model.getSearchResultsPage(1))
//     // 4. Render initial pagination buttons
//     paginationView.render(model.state.search)

//   } catch (err) {
//     console.log(err)
//   }
// }

// const controlPagination = function (gotoPage) {
//   // 1. render NEW  search result
//   resultsView.render(model.getSearchResultsPage(1))
//   // 2. Render NEW pagination buttons
//   paginationView.render(model.state.search)
// }
// // const controlServings = function (newServings) {
// //   // update the recipe servings (in state)
// //   model.updateServings(newServings)
// //   // Update the recipe view
// //   recipeView.update(model.state.recipe)
// //   console.log(model.state.recipe)
// // }


// const controlServings = function (newServings) {
//   // Update the recipe servings (in state)
//   model.updateServings(newServings);

//   // Update the recipe view
//   // console.log(recipeView.update())
//   recipeView.update(model.state.recipe);

// };

// const controlAddBookmark = function () {
//   // 1. Add  or delete bookmark 
//   if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
//   else model.deleteBookmark(model.state.recipe.id);

//   console.log(model.state.recipe, model.state.recipe, model.state.recipe.id)
//   // 2 Update bookmark
//   recipeView.update(model.state.recipe)

//   // 3. render bookmark
//   bookmarksView.render(model.state.bookmarks)
// }
// const controlRecipeUpload = async function (newRecipe) {
//   // try {

//   //   // Show loading spinner
//   //   addRecipeView.renderSpinner()
//   //   //UPLOAD NEW RECIPE
//   //   await model.uploadRecipe(newRecipe)

//   //   // Render recipe
//   //   recipeView.render(model.state.recipe)

//   //   // Success Message
//   //   addRecipeView.renderMessage()

//   //   // Close  Form  Window
//   //   setTimeOut(function () {
//   //     addRecipeView.toggleWindow();
//   //   }, MODAL_CLOSE_SEC * 1000)

//   // } catch (error) {
//   //   console.error(error)
//   //   addRecipeView.renderError(error.message)
//   // }



//   try {
//     // Show loading spinner
//     addRecipeView.renderSpinner();

//     // Upload the new recipe data
//     await model.uploadRecipe(newRecipe);
//     console.log(model.state.recipe);

//     // Render recipe
//     recipeView.render(model.state.recipe);

//     // Success message
//     addRecipeView.renderMessage();

//     // Render bookmark view
//     bookmarksView.render(model.state.bookmarks);

//     // Change ID in URL
//     // window.history.pushState(null, '', `#${model.state.recipe.id}`);

//     // Close form window
//     setTimeout(function () {
//       addRecipeView.toggleWindow();
//     }, MODAL_CLOSE_SEC * 1000);
//   } catch (err) {
//     console.error('💥', err);
//     addRecipeView.renderError(err.message);
//   }

// }

// // window.addEventListener("hashchange", controlRecipes)
// // window.addEventListener("load", controlRecipes)
// // controlRecipes()
// const init = function () {
//   recipeView.addHandlerRenders(controlRecipes)
//   recipeView.addHandlerUpdateServings(controlServings)
//   searchView.addHandlerSearch(controlSearch)
//   paginationView.addHandlerRender(controlPagination)
//   recipeView.addHandlerAddBookmark(controlAddBookmark)
//   addRecipeView.addHandlerUploadRecipe(controlRecipeUpload)

// }
// init()

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/pagination.js';
import bookmarksView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();

        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage(1));
        console.log(model.getSearchResultsPage(1))

        // 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks);

        // 2) Loading recipe
        await model.loadRecipe(id);

        // 3) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
        console.error(err);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        resultsView.render(model.getSearchResultsPage());

        // 4) Render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (goToPage) {
    // 1) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 2) Render NEW pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // 1) Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // 2) Update recipe view
    recipeView.update(model.state.recipe);

    // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        // Show loading spinner
        addRecipeView.renderSpinner();

        // Upload the new recipe data
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        // Render recipe
        recipeView.render(model.state.recipe);

        // Success message
        addRecipeView.renderMessage();

        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // Close form window
        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
        console.error('💥', err);
        addRecipeView.renderError(err.message);
    }
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();



