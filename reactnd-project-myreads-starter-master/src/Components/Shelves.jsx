import React from 'react'
import Books from './Books'

const Shelves = (props) => {
    const {shelf} = props;
    
  return (
     <div className="bookshelf">
     <h2 className="bookshelf-title">{shelf.type}</h2>
     <div className="bookshelf-books">
       <ol className="books-grid">

       {shelf.books.map(book => <Books key={book.id} book={book} />)}
      
        
       </ol>
     </div>
   </div>
  )
}

export default Shelves
