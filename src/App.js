import React from 'react'
// import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookView extends React.Component {

  changeShelf(e) {
    console.log(this.props.book.id, e.target.value);
    this.props.app.changeShelf(this.props.book.id, e.target.value);
  }

  onFocus(e) {
    console.log('selected');
    // const el = this.refs[charger];
    console.log(e.refs["charger"]);
    // this.setState({value: el.target.value});
    // el.value = {this.props.book.shelf};
    // $('#charger').val(this.props.book.shelf);
    document.getElementById('charger').value = this.props.book.shelf;
  }

  render() {
    return (
      <li>
      <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: "url(" + this.props.book.imageLinks.smallThumbnail + ")"}}></div>
          <div className="book-shelf-changer">
          {/* <select name="charger" ref="charger" onChange={e=>this.changeShelf(e)} onFocus={this.onFocus(this)} > */}
          <select name="charger" ref="charger" onChange={e=>this.changeShelf(e)} value={this.props.book.shelf} >
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

class BooksApp extends React.Component {
  /* Initial propTypes */
  state = {
      all_books: []
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
      </div>
    )
  }
}

export default BooksApp
