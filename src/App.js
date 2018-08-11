import React from 'react'
// import escapeRegExp from 'escape-string-regexp'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookView extends React.Component {

  changeShelf(e) {
    console.log(this.props.book.id, e.target.value);
    this.props.app.changeShelf(this.props.book.id, e.target.value);
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
          <select name="charger" ref="charger" onChange={e=>this.changeShelf(e)} defaultValue={this.props.book.shelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
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
      showSearchPage: false
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

  searchResult(e) {
    let app = this;
    if(e) {
      BooksAPI.search(e).then(function(books) {
        console.log(books);
        if(Array.isArray(books)) {
          books.map( book => book.shelf = "");
          app.setState({search_books : books});
        } else {
          console.log('no result', books.error);
          books = [];
          app.setState({search_books : books});
        }
      })
      .catch(function(error) {
        console.log(error);
        const books = [];
        app.setState({search_books : books});
      });
    } else {
      const books = [];
      app.setState({search_books : books});
    }
  }

  componentWillMount() {
    let app = this;
    console.log("well, actually here");
    BooksAPI.getAll().then(function(books) {
      console.log("here");
      console.log(books);
      if (!books.error) {
        app.setState({all_books : books});
      }
    });
  }
  

  render() {
    console.log("render BooksApp");
    
    return (
      <div className="app">
        {/* {this.state.showSearchPage ? ( */}
        <Route exact path="/search" render={() =>(
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={e => this.searchResult(e.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
                {/* <ShelfView shelf_name="" books={this.state.search_books} app={this} /> */}
                <SearchResultView books={this.state.search_books} app={this} />
            </div>
          </div>
        )}/>
        {/* ) : (  */}
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
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      )}/>
      {/* )} */}
      </div>
    )
  }
}

export default BooksApp
