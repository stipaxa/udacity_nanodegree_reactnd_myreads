import React from 'react'
// import escapeRegExp from 'escape-string-regexp'
import {Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookView extends React.Component {

  changeShelf(e) {
    console.log(this.props.book.id, e.target.value);
    this.props.app.changeShelf(this.props.book.id, e.target.value);
  }

  addBook(e) {
    console.log(this.props.book.id, e.target.value);
    this.props.app.addBook(this.props.book.id, e.target.value);
  }

  render() { 
    return (
      <li>
      <div className="book">
        <div className="book-top">
        {this.props.book.imageLinks ? (
          <div className="book-cover" style={{width: 128, height: 193, backgroundImage: "url(" + this.props.book.imageLinks.smallThumbnail + ")"}}></div>
        ) : (
          <div className="book-cover" style={{width: 128, height: 193}}></div>
        )}
          <div className="book-shelf-changer">
          {this.props.book.shelf ? ( 
            <select name="charger" ref="charger" onChange={e=>this.changeShelf(e)} defaultValue={this.props.book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
          </select>
          ) : (
            <select name="charger" ref="charger" onChange={e=>this.addBook(e)} defaultValue={this.props.book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
          </select>
          )} 
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
      </li>
    )
  } 
}

class ShelfView extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf_name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter(book => book.shelf===this.props.shelf_name).map((book) => (
              <BookView key={book.id} book={book} app={this.props.app}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

class SearchResultView extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.filter(book => book.shelf==='').map((book) =>(
          <BookView key={book.id} book={book} app={this.props.app}/>
        ))}
      </ol>
    )
  }
}

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
    console.log(book_id, shelf);

    let books = [];
    for( let i = 0; i < this.state.search_books.length; i++ ) {
      books[i] = this.state.search_books[i];
      if( books[i].id === book_id && shelf != 'none') {
        books[i].shelf = shelf;      
        this.state.all_books.push(books[i]);
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
          books.filter(book => !book.shelf).map( book => book.shelf = "");
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
    // let search_b = [];
    // BooksAPI.search('Lit').then(function(search_b){
    //   console.log("search_b", search_b);
    // });

    // return (
    //   <div>Hello</div>
    // )

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
                {/* <ShelfView shelf_name="" books={this.state.search_books} app={this} /> */}
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
