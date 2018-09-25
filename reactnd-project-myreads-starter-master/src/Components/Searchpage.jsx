import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../Data/BooksAPI'
import Books from './Books'

export default class Searchpage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       books: [],
       query: ''
    }
  }

  synchronizeBooks = (queryAllBooks) => {
    return(queryAllBooks.map(book => {
      const bookMine = this.props.book.find(item => item.id === book.id);
      if (bookMine) {
        book['shelf'] = bookMine.shelf;
      }
      return book;
    } ))

  }

  inputDiff = (evt) => {
    const query = evt.target.value;
    this.setState({ query });
    BooksAPI.search(query)
    .then(res => this.setState({ books: Array.isArray(res) ? this.synchronizeBooks(res) : [] })
      );
  }
  
  render() {

      const { swapShelf } = this.props;
      const { books } = this.state;

    return (
        //Beginning Search page
          <div className="search-books">
            <div className="search-books-bar">
              <Link to= "/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  value={this.state.query} 
                  type="text"
                  placeholder="Search by title or author"
                  onChange={this.inputDiff}
                  />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {books.map(book => <Books key={book.id} book={book} swapShelf={swapShelf} />)}
              </ol>
            </div>
          </div>
          //End Search page
    )
  }
}
