import { BookObject } from "../BooksPage/types";

export interface UserObject {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImageUrl?: string;
}

export interface BorrowObject {
  dueDate: string;
  book: BookObject;
  createDate: string;
  returnDate: string;
  bookInstanceId: string;
}

export interface BorrowMap {
  [key: string]: BorrowObject;
}

export interface BorrowItemProps {
  borrow: BorrowObject;
}

export interface UserListProps {
  users: UserObject[];
  borrowsMap: BorrowMap;
}
