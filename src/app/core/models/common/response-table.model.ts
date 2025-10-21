export class ResponseTableModel<T> {
  status: number
  message: string
  data: Data<T>
  error: boolean

  constructor(message: string, error: boolean, status: number, data: Data<T>) {
    this.error = error
    this.message = message
    this.status = status
    this.data = data
  }
}

class Data<T> {
  content: [T]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  empty: boolean

  constructor(
    content: [T],
    pageable: Pageable,
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: Sort,
    numberOfElements: number,
    first: boolean,
    empty: boolean
  ) {
    this.content = content
    this.pageable = pageable
    this.totalPages = totalPages
    this.totalElements = totalElements
    this.last = last
    this.size = size
    this.number = number
    this.sort = sort
    this.numberOfElements = numberOfElements
    this.first = first
    this.empty = empty
  }
}

class Pageable {
  sort: Sort
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
  constructor(
    sort: Sort,
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  ) {
    this.sort = sort
    this.offset = offset
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.paged = paged
    this.unpaged = unpaged
  }
}

class Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
  constructor(empty: boolean, sorted: boolean, unsorted: boolean) {
    this.empty = empty
    this.sorted = sorted
    this.unsorted = unsorted
  }
}
