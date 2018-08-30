import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ShelfView from './ShelfView'
import SearchResultView from './SearchResultView'
import './App.css'
import Switch from 'react-router-dom/Switch';

class BooksApp extends React.Component {
  /* Initial propTypes */
  state = {
      all_books: [],
      search_books: [],
      query: ''
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

    let books = this.state.all_books;
    for( let i = 0; i < this.state.search_books.length; i++ ) {
      const a_book = this.state.search_books[i];
      if( a_book.id === book_id) {
        a_book.shelf = shelf;
        books.push(a_book);
        BooksAPI.update(a_book, shelf);  
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
          books.filter(book => !book.shelf).map(book => book.shelf = "none");          
          for( let i = 0; i < books.length; i++ ) {
            for(let j = 0; j < app.state.all_books.length; j++ )
            {
              const a_book = app.state.all_books[j];
              if(books[i].id === a_book.id) {
                books[i].shelf = a_book.shelf;
              }
            }
          }
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

  componentDidMount() {
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
      <Switch>
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

        <Route exact path="/" render={() => (
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
        </Switch>
      </div>
    ) 
  }
}

export default BooksApp