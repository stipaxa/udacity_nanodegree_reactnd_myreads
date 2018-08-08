import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import './App.css'

// class Book;
// class Shelf;
// class BooksApp;

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
      console.log("here");
      console.log(books);
      console.log(app);
      app.setState({all_books : books});
    });
  }
  

  render() {
    console.log("render");
    
    return (
      <div>
        <span>all shelves</span>
      {/* <li>{this.state.all_books.length}</li> */}
      <ol className='all-shelfs'>
        {this.state.all_books.map((book) => (
          <li key={book.id}>{book.title} - {book.shelf}</li>
        ))}
      </ol>
      </div>
    )
  }
}

export default BooksApp
