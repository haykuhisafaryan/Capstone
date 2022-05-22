import "./booksList.css";
import BookItem from "../BookItem";
import { BookObject } from "../types";

function BookList({ updateBooksList, onBookEdit, onQRClick, books }: any) {
  return (
    <div className="books-list-container">
      {books.map((book: BookObject) => (
        <BookItem
          onEditClick={onBookEdit}
          book={book}
          key={book.id}
          updateBooksList={updateBooksList}
          onQRClick={onQRClick}
        />
      ))}
    </div>
  );
}

export default BookList;
