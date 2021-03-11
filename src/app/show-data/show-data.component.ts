import { Observable, Subject } from 'rxjs';
import { BookService } from './../book.service';
import { Book } from './../book';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getJSON } from 'jquery';
import { stringify } from '@angular/compiler/src/util';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  // book = new Book();
  // public data;
  // isUpdate = false;
  // booklist: Observable<Book[]>;
  // booksArray: any[] = [];
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  // books: Observable<Book[]>;
  // book: Book = new Book();
  data: Book[] = []
  books: Observable<Book[]>;
  private searchTerms = new Subject<string>();
  searchText: string = '';




  constructor(private bookService: BookService) { }
  CategoryName = [
    { cid: 1, name: 'Văn hóa' },
    { cid: 2, name: 'Lịch sử' },
    { cid: 3, name: 'Khoa học' },
  ];

  customSearchFn(term1: string, item): void {
    item.name = term1;
    this.searchTerms.next(term1);

  }

  ngOnInit(): void {

    this.books = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term1: string) => this.bookService.searchByCag(term1),
      ));
    this.data = Object.values(this.books);
  }
  // ngOnInit() {
  //   // this.getData(this.book);
  //   // this.dtOptions = {
  //   //   pageLength: 15,
  //   //   stateSave: true,
  //   //   lengthMenu: [[15, 20, 25, -1], [15, 20, 25, "All"]],
  //   //   processing: true
  //   // };
  //   // this.bookService.getBookList().subscribe(data => {
  //   //   this.books = data;
  //   //   this.dtTrigger.next();
  //   // })
  // }


  // searchByBook = '';
  // searchByPublisher = '';
  // searchByAuthor = '';
  // form = new FormGroup({
  //   bookName: new FormControl(),
  //   authorName: new FormControl(),
  //   publisherName: new FormControl()
  // });


  // getData(book) {
  //   this.bookService.getData(book).subscribe(
  //     response => {
  //       this.book = response.valueOf();
  //     },
  //     error => {
  //       console.log("error while getting user Details");
  //     }
  //   );
  // }

  // searchForm(searchInfo) {
  //   this.book.bookName = this.BookName.value;
  //   this.book.authorName = this.AuthorName.value;
  //   this.book.publisherName = this.PublisherName.value;
  //   this.getData(this.book);
  //   this.bookService.getData(this.book).subscribe(
  //     data => {
  //       this.bookService.getBookList().subscribe(data => {
  //         this.book = data
  //       })
  //     },
  //     error => console.log(error));
  // }

  //  this.bookService.getData().subscribe(
  //    data => {
  //      this.isupdated = true;
  //      this.bookService.getBookList().subscribe(data => {
  //        this.books = data
  //      })
  //    },
  //    error => console.log(error));
  // }


  // get BookName() {
  //   return this.form.get('bookName');
  // }

  // get AuthorName() {
  //   return this.form.get('authorName');
  // }

  // get PublisherName() {
  //   return this.form.get('publisherName');
  // }

  // resetFilter(book){
  //   this.book.controls['filter'].value = null;
  // }

}
