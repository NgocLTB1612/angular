import { ArrayType } from "@angular/compiler";

export class Category {
  cid: number;
  cag_name: string;
  books: {
    bid: number;
    bookName: string;
    authorName: string;
    publisherName: string;
  }
}
