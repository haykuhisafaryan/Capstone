export interface AuthorObject {
  name: string;
  id: string;
  imageId?: string;
}

export interface BookInstance {}

export interface BookObject {
  id: string;
  author: AuthorObject;
  title: string;
  instances: BookInstance[];
}

export interface ValueObject {
  id: string;
  value: string;
}
