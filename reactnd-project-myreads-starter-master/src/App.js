import React from 'react'
import * as BooksAPI from './Data/BooksAPI'
import './App.css'
import SearchPage from './Components/Searchpage'
import MainPage from './Components/Mainpage'
import { Route } from 'react-router-dom';
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

      if(!books.includes(moveBook)){
        moveBook.shelf=shelfDiff;
        books.push(moveBook);
      }
      else{
      books.map(book => {
        if (book.id === moveBook.id){
          book.shelf = shelfDiff
        }

        return book;
      })
    }
      return { books }
    })
     }
  
  render() {
    const {books} = this.state;

    return (
      <div className="app">
      <Route
        exact 
        path='/'
        render = {() => 
          (
            <MainPage
             books={books}
             searchClick={this.searchClick}
             swapShelf={this.swapShelf}
              />
           )
        }
      
      />
      <Route 
        path='/search'
        render = {()=>
          (
            <SearchPage backClick={this.backClick} book={books} swapShelf={this.swapShelf} />
           )
        }
       />
       
      </div>
    )
  }
}

export default BooksApp
