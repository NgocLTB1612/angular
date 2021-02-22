import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Observable, Subject } from "rxjs";
import { DataTablesModule } from 'angular-datatables';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private bookService: BookService) { }

  booksArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  books: Observable<Book[]>;
  book: Book = new Book();
  deleteMessage = false;
  booklist: any;
  isupdated = false;


  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 15,
      stateSave: true,
      lengthMenu: [[15, 20, 25, -1], [15, 20, 25, "All"]],
      processing: true
    };
    this.bookService.getBookList().subscribe(data => {
      this.books = data;
      this.dtTrigger.next();
    })
  }

  deleteBook(bid: number) {
    this.bookService.deleteBook(bid)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.bookService.getBookList().subscribe(data => {
          this.books = data;
          })
        },
        error => console.log(error));
  }


  updateBook(bid: number) {
    this.bookService.getBook(bid)
      .subscribe(
        /* data => {
          this.booklist = data
        },
        error => console.log(error) */
        data => {
          this.booklist = data;
          this.booklist = Array.of(this.booklist);
        },
        err => console.error(err),
        () => console.log('getBooks completed')

      );
  }

  bookupdateform = new FormGroup({
    bid: new FormControl(),
    bookName: new FormControl(),
    authorName: new FormControl(),
    publisherName: new FormControl()
  });

  updateBk(updbk) {
    this.book = new Book();
    this.book.bid = this.Bid.value;
    this.book.bookName = this.BookName.value;
    this.book.authorName = this.AuthorName.value;
    this.book.publisherName = this.PublisherName.value;
    console.log(this.BookName.value);
    console.log(this.AuthorName.value);
    console.log(this.PublisherName.value);


    this.bookService.updateBook(this.book.bid, this.book).subscribe(
      data => {
        this.isupdated = true;
        this.bookService.getBookList().subscribe(data => {
          this.books = data
        })
      },
      error => console.log(error));
  }


  get Bid() {
    return this.bookupdateform.get('bid');
  }
  get BookName() {
    return this.bookupdateform.get('bookName');
  }
  get AuthorName() {
    return this.bookupdateform.get('authorName');
  }
  get PublisherName() {
    return this.bookupdateform.get('publisherName');
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
