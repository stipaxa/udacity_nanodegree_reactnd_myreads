import React from 'react'

class BookView extends React.Component {

    changeShelf(e) {
      console.log("change shelf", this.props.book.id, e.target.value);
      this.props.app.changeShelf(this.props.book.id, e.target.value);
    }
  
    addBook(e) {
      console.log("add book", this.props.book.id, e.target.value);
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
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: "url(" + require('./placeHolder.png') + ")"}}></div>
          )}
            <div className="book-shelf-changer">
            {this.props.book.shelf !== "none" ? ( 
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
  
export default BookView