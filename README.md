# MyReads Project

This is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

## How to start
* Clone the project `https://github.com/stipaxa/udacity_nanodegree_reactnd_myreads.git`
* install all project dependencies with `npm install`
* start the development server with `npm start`
* The new page with home page of this project will opened with URL `http://localhost:3000/` on your web browser

## How it works

### Main page
* The main page shows 3 shelves (currently reading, want to read, read) for books. Each book is shown on the correct shelf, along with its title and author(s).
* The main page shows a control that allows you to move books between shelves.

### Search page
* The search page has a search input field where you can write criteria of your search.
* Search results on the search page allow you to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

[based on UDACITY PROJECT SPECIFICATION](https://review.udacity.com/#!/rubrics/918/view)
