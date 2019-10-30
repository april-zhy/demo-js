

export interface BookRequest {
  book_id?: string;
  book_name?: string;
  author?: string;
  isbn?: string;
  book_no?: string;
  type_id?: string;
  brief_intro?: string;
  place?: string;
  publishing?: string;
  owner?: string;
  current_borrower?: string;
  average_score?: string;
  borrow_status?: Number;
  his_borrow_record?: string;
  borrower?: string;
  search?: string;
  simple?: Boolean;
}

export interface BookResponse {
  author: string;
  averageScore: null
  bookId: number;
  bookName: string;
  bookNo: string;
  briefIntro: string;
  coverThumbnailUrl: string;
  coverUrl: string;
  currentBorrowerName: string;
  currentBorrowerRealName: null
  currentBorrowerUid: string;
  date: string;
  department: string;
  isbn: null
  ownerName: string;
  ownerRealName: null
  ownerUid: string;
  place: string;
  publishing: string;
  typeId: number;
  typeName: string;
}

export interface BookTypeResponse {
  bookTypeId: number | string;
  typeName: string;
}