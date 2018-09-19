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

  render() {
    const {books} = this.state;

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
