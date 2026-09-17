import { create, type StateCreator } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import type { Book, BookFormData } from '../types/book'

export interface BookStoreState {
  books: Book[]
  noOfAvailable: number
  noOfIssued: number
}

export interface BookStoreActions {
  addBook: (book: BookFormData) => void
  issueBook: (id: string) => void
  returnBook: (id: string) => void
  reset: () => void
}

export type BookStore = BookStoreState & BookStoreActions

const initialState: BookStoreState = {
  books: [],
  noOfAvailable: 0,
  noOfIssued: 0,
}

const bookStoreCreator: StateCreator<
  BookStore,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  []
> = (set, get) => ({
  ...initialState,
  addBook: (book) => {
    set((state) => ({
      books: [...state.books, { ...book, status: 'available' }],
      noOfAvailable: state.noOfAvailable + 1,
    }))
  },
  issueBook: (id) => {
    const books = get().books
    const updatedBooks = books?.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          status: 'issued' as const,
        }
      }
      return book
    })
    set((state) => ({
      books: updatedBooks,
      noOfAvailable: state.noOfAvailable - 1,
      noOfIssued: state.noOfIssued + 1,
    }))
  },
  returnBook: (id) => {
    const books = get().books
    const updatedBooks = books?.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          status: 'available' as const,
        }
      }
      return book
    })
    set((state) => ({
      books: updatedBooks,
      noOfAvailable: state.noOfAvailable + 1,
      noOfIssued: state.noOfIssued - 1,
    }))
  },
  reset: () => {
    set(initialState)
  },
})

const useBookStore = create<BookStore>()(
  devtools(
    persist(bookStoreCreator, {
      name: 'books',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
)

export default useBookStore
