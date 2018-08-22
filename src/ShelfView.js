import React from 'react'
import BookView from './BookView'

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

export default ShelfView