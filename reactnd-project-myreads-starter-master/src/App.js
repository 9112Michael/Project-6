import React from 'react'
import * as BooksAPI from './Data/BooksAPI'
import './App.css'
import SearchPage from './Components/Searchpage'
import MainPage from './Components/Mainpage'
//import {APIBooks} from './Data/Bookdata'

class BooksApp extends React.Component {
constructor(props) {
  super(props)

  this.state = {
    books: [],
    showSearchPage: false
   }
  }

  componentDidMount = () => {
    BooksAPI.getAll()
    .then(res => this.setState({books: res}))
    .catch(err => { });
  }

  backClick =() => {
    this.setState({ showSearchPage: false })
  }

  searchClick =() => {
    this.setState({ showSearchPage: true })
  }

  swapShelf =(moveBook, shelfDiff) => {
    BooksAPI.update(moveBook, shelfDiff);
    //First solution: Asynch response
    //.then(res => (BooksAPI.getAll()
    //.then(res => this.setState({ books: res}))) 

    //)
    //Second solution
    this.setState((state,props) => {
      const books = state.books;

      const newBooks = books.map(book => {
        if (book.id === moveBook.id){
          book.shelf = shelfDiff
        }

        return book;
      })

      return { books: newBooks}
    })
     }
  
  render() {
    const {books} = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <SearchPage backClick={this.backClick} />
        ) : (
         <MainPage
          books={books}
          searchClick={this.searchClick}
          swapShelf={this.swapShelf}
           />
        )}
      </div>
    )
  }
}

export default BooksApp
