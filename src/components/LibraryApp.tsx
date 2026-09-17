import BookForm from './BookForm'
import BookList from './BookList'
import useBookStore from '../store/bookStore'

function LibraryApp() {
  const reset = useBookStore((state) => state.reset)

  return (
    <div className="library-app">
      <div className="library-header">
        <h2>My Library Store</h2>
        <p>Manage book inventory with Zustand store</p>
        <button onClick={reset} className="reset-btn">
          Reset Library
        </button>
      </div>
      <BookForm />
      <BookList />
    </div>
  )
}

export default LibraryApp
