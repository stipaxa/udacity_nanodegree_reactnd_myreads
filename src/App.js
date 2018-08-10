import React from 'react'
// import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookView extends React.Component {

  changeShelf(e) {
    console.log(this.props.book.id, e.target.value);
    this.props.app.changeShelf(this.props.book.id, e.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
        {/* <div className="book-cover" style={{width: 128, height: 193, backgroundImage: "url(" + this.props.book.imageLinks.smallThumbnail + ")"}}></div> */}
          <li>{this.props.book.title} - {this.props.book.shelf}</li>
          <div className="book-shelf-changer">
          <select onChange={e => this.changeShelf(e)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
          </div>
        </div>
      </div>
    )
  } 
}

class ShelfView extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.shelf_name} - {this.props.books.length}</span>
        
        <ul className='all-shelfs'>
          {this.props.books.filter(book => book.shelf===this.props.shelf_name).map((book) => (
            <BookView key={book.id} book={book} app={this.props.app}/>
          ))}
        </ul> 
      </div>
    )
  }
} 

class BooksApp extends React.Component {
  /* Initial propTypes */
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

      all_books: []
    }

  changeShelf(book_id, shelf) {
    let books = [];
    
    for( let i = 0; i < this.state.all_books.length; i++ ) {
      books[i] = this.state.all_books[i];
      if( books[i].id === book_id ) {
        books[i].shelf = shelf;        
      }
    }
    this.setState({all_books: books});
  }

  componentWillMount() {
    let app = this;
    console.log("well, actually here");
    BooksAPI.getAll().then(function(books) {
    // BooksAPI.search("linux").then(function(books) {
      console.log("here");
      console.log(books);
      console.log(app);
      if (!books.error) {
        app.setState({all_books : books});
      }
    });
  }
  

  render() {
    console.log("render BooksApp");
    
    return (
      <div>
        <ShelfView shelf_name="currentlyReading" books={this.state.all_books} app={this}/>      
        <ShelfView shelf_name="wantToRead" books={this.state.all_books} app={this}/>
        <ShelfView shelf_name="read" books={this.state.all_books} app={this}/>  
      </div>
    )
  }
}

export default BooksApp
