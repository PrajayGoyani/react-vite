import { Fragment } from "react";
import useBookStore from "../store/bookStore";

function BookList() {
  const books = useBookStore((state) => state.books);
  const noOfAvailable = useBookStore((state) => state.noOfAvailable);
  const noOfIssued = useBookStore((state) => state.noOfIssued);
  const issueBook = useBookStore((state) => state.issueBook);
  const returnBook = useBookStore((state) => state.returnBook);

  return (
    <div className="book-list-container">
      {books?.length > 0 ? (
        <span className="books-count">
          <h4>Available: {noOfAvailable}</h4>
          <h4>Issued: {noOfIssued}</h4>
        </span>
      ) : (
        <p className="no-books-msg">No books added yet.</p>
      )}
      <ul className="book-list">
        {books?.map((book) => {
          return (
            <Fragment key={book.id}>
              <li className="list-item">
                <span className="list-item-book">
                  <span className="book-id-badge">{book.id}</span>
                  <span className="book-title">{book.name}</span>
                  <span className="book-author">by {book.author}</span>
                  <span className={`status-badge ${book.status}`}>
                    {book.status}
                  </span>
                </span>
                <div className="btn-grp">
                  <button
                    onClick={() => issueBook(book.id)}
                    className={`issue-btn ${
                      book.status === "issued" ? "disabled" : ""
                    }`}
                    disabled={book.status === "issued"}
                  >
                    Issue
                  </button>
                  <button
                    onClick={() => returnBook(book.id)}
                    className={`return-btn ${
                      book.status === "available" ? "disabled" : ""
                    }`}
                    disabled={book.status === "available"}
                  >
                    Return
                  </button>
                </div>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
