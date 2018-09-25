import React, { Component } from 'react'

export default class Books extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       shelf: ''
    }
  }

  componentDidMount = () => {
    this.setState({shelf: this.props.book.shelf})
  }

  swapShelf= (event) => {
    const shelf = event.target.value;
    this.props.swapShelf(this.props.book, shelf)
    this.setState({ shelf })
  }
  
  render() {

    const { book }= this.props;
    const { shelf }= this.state;
    const { imageLinks = [], title, authors = ['Author Not Listed'] }=book;
    const { thumbnail = '' } = imageLinks;
    //console.log(book);
    return (

       <li>
       <div className="book">
         <div className="book-top">
           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
           <div className="book-shelf-changer">
             <select value={shelf ? shelf:'none'} onChange={this.swapShelf}>
               <option value="move" disabled>Move to...</option>
               <option value="currentlyReading">Currently Reading</option>
               <option value="wantToRead">Want to Read</option>
               <option value="read">Read</option>
               <option value="none">None</option>
             </select>
           </div>
         </div>
         <div className="book-title">{title}</div>
         {authors.map(author => (<div key= {author} className="book-authors">{author}</div>))}
       </div>
     </li>
    )
  }
}
