import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import './App.css'

// class Book;
// class Shelf;
// class BooksApp;

class BookView extends React.Component {
  render() {
    return (
      <li key={this.props.book.id}>{this.props.book.title} - {this.props.book.shelf}</li>
    )
  } 
}

class ShelfView extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <span>{this.props.shelf_name} - {this.props.books.length}</span>
      
      <ul className='all-shelfs'>
      {this.props.books.filter(book => book.shelf===this.props.shelf_name).map((book) => (
        // <li key={book.id}>{book.title} - {book.shelf}</li>
        <BookView book={book} />
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
    console.log("render");
    
    return (
      <div>
        <ShelfView shelf_name='currentlyReading' books={this.state.all_books} />      
        <ShelfView shelf_name='wantToRead' books={this.state.all_books} />
        <ShelfView shelf_name='read' books={this.state.all_books} />  
      </div>
    )
  }
}

export default BooksApp
