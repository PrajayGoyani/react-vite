export type BookStatus = 'available' | 'issued'

export interface Book {
  id: string
  name: string
  author: string
  status: BookStatus
}

export interface BookFormData {
  id: string
  name: string
  author: string
}
