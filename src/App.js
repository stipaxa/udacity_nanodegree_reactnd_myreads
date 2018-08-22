import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ShelfView from './ShelfView'
import SearchResultView from './SearchResultView'
import './App.css'

class BooksApp extends React.Component {
  /* Initial propTypes */
  state = {
      all_books: [],
      search_books: [],
      query: ''
      // place_holder: "url(placeHolder.png)"
  }

  changeShelf(book_id, shelf) {
    let books = [];
    
    for( let i = 0; i < this.state.all_books.length; i++ ) {
      books[i] = this.state.all_books[i];
      if( books[i].id === book_id ) {
        books[i].shelf = shelf;      
        BooksAPI.update(books[i], shelf);  
      }
    }
    this.setState({all_books: books});
  }

  addBook(book_id, shelf) {
    console.log("add book", book_id, shelf);

    let books = [];
    for( let i = 0; i < this.state.search_books.length; i++ ) {
      books[i] = this.state.search_books[i];
      if( books[i].id === book_id) {
        books[i].shelf = shelf;
        BooksAPI.update(books[i], shelf);  
      }
    }
    this.setState({all_books: books});
  }

  searchBooks = (query) => {
    this.setState({query: query.trim()});
    let app = this;
    let books = [];
    if(query) {
      BooksAPI.search(query).then(function(books) {
        if(Array.isArray(books)) {
          console.log(books);
          books.filter(book => !book.shelf).map( book => book.shelf = "none");
          app.setState({search_books : books, query: query});
        } else {
          console.log('no result', books.error);
          books = [];
          app.setState({search_books : books, query: query});
        }
      })
      .catch(function(error) {
        console.log(error);
        books = [];
        app.setState({search_books : books, query: query});
      });
      console.log("query = ", query);      
    } else {
      books = [];
      app.setState({search_books : books, query: query});
    }
  }

  componentWillMount() {
    let app = this;
    console.log("well, actually here");
    BooksAPI.getAll().then(function(books) {
      console.log("here");
      if (!books.error) {
        app.setState({all_books : books});
      }
    });
  }
  
  render() {
    console.log("render BooksApp");
    console.log("start books", this.state.all_books);

    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" 
                  value={this.state.query} 
                  onChange={(e) => this.searchBooks(e.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <SearchResultView books={this.state.search_books} app={this} />
            </div>
          </div>
        )}/>

        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfView shelf_name="currentlyReading" books={this.state.all_books} app={this}/>      
                <ShelfView shelf_name="wantToRead" books={this.state.all_books} app={this}/>
                <ShelfView shelf_name="read" books={this.state.all_books} app={this}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    ) 
  }
}

export default BooksApp