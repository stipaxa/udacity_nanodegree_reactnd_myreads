import React from 'react'
import BookView from './BookView'

class SearchResultView extends React.Component {
    render() {
      console.log('search result');
      return (
          <div>
        {this.props.books.length ? (
            <ol className="books-grid">
              {this.props.books.map((book) =>(
                <BookView key={book.id} book={book} app={this.props.app}/>
              ))}
            </ol>
        ) : (
            <div className="books-grid">No result</div>
        )}
        </div>
      )
    }
}

export default SearchResultView