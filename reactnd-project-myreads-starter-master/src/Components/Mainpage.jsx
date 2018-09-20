import React, { Component } from 'react';
import Shelves from './Shelves'

export default class Mainpage extends Component {

  shelveBooks = (books) => { 

    const currently = books.filter(book => book.shelf === 'currentlyReading');
    const want = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');


    return [
      {type: 'Currently Reading', books: currently},
      {type: 'Want To Read', books: want},
      {type: 'Read', books: read}
    ]
  }

  render() {

      const {searchClick, books, swapShelf} = this.props;
      const shelves= this.shelveBooks(books);
      

    return (
       //Start Main page
       <div className="list-books">
       <div className="list-books-title">
         <h1>MyReads</h1>
       </div>
       <div className="list-books-content">
         <div>

           {shelves.map(shelf => <Shelves key={shelf.type} shelf={shelf} swapShelf={swapShelf} />)}

           
         </div>
       </div>
       <div className="open-search">
         <a onClick={searchClick}>Add a book</a>
       </div>
     </div>
     //End Main page
    )
  }
}
