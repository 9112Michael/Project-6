import React from 'react'
import * as BooksAPI from './Data/BooksAPI'
import './App.css'
import SearchPage from './Components/Searchpage'
import MainPage from './Components/Mainpage'
import {APIBooks} from './Data/Bookdata'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  backClick =() => {
    this.setState({ showSearchPage: false })
  }

  searchClick =() => {
    this.setState({ showSearchPage: true })
  }

  render() {

    const books = APIBooks;
    

    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <SearchPage backClick={this.backClick} />
        ) : (
         <MainPage books={books} searchClick={this.searchClick} />
        )}
      </div>
    )
  }
}

export default BooksApp
