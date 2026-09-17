import { useState } from "react";
import useBookStore from "../store/bookStore";

function BookForm() {
  const addBook = useBookStore((state) => state.addBook);
  const [bookDetails, setBookDetails] = useState({ id: "", name: "", author: "" });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setBookDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    if (!bookDetails.id?.trim() || !bookDetails.name?.trim() || !bookDetails.author?.trim()) {
      return alert("Please enter all book details!");
    }
    addBook(bookDetails);
    setBookDetails({ id: "", name: "", author: "" });
  };

  return (
    <div className="input-div">
      <div className="input-grp">
        <label>Book ID</label>
        <input
          type="text"
          name="id"
          value={bookDetails.id || ""}
          onChange={handleOnChange}
          placeholder="e.g. B101"
        />
      </div>
      <div className="input-grp">
        <label>Book Name</label>
        <input
          type="text"
          name="name"
          value={bookDetails.name || ""}
          onChange={handleOnChange}
          placeholder="e.g. Clean Code"
        />
      </div>
      <div className="input-grp">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={bookDetails.author || ""}
          onChange={handleOnChange}
          placeholder="e.g. Robert C. Martin"
        />
      </div>
      <button onClick={handleAddBook} className="add-btn">
        Add Book
      </button>
    </div>
  );
}

export default BookForm;
