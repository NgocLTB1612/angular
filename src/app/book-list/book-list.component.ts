import { CategoryService } from './../category.service';
import { Category } from './../category';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Observable, Subject } from "rxjs";
import { DataTablesModule } from 'angular-datatables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  //searchby Book
  searchByBook = '';
  searchByAuthor = '';
  searchByPublisher = '';
  searchByCagName = '';
  term: string = '';
  category: any;
  search(): void {
    console.log("search");
    this.bookService.searchBooks(this.term).subscribe(data => {
      this.data = data;
    },
      err => {

      })
  }
  reset(): void {
    this.term = null;
  }
  CategoryName = [
    { cid: 1, name: 'Văn hóa' },
    { cid: 2, name: 'Lịch sử' },
    { cid: 3, name: 'Khoa học' },
  ];

  customSearchFn(item): void {
    item.name = this.searchByCagName;
  }

  //searchBy Category





  //pagination
  currentBook?: Book;
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 15;
  pageSizes = [15, 20, 25];
  totalItems: any;


  //confirmation dialog
  constructor(private bookService: BookService, private router: Router, private categoryService: CategoryService) { }
  popoverTitle = 'Are you sure';
  popoverMessage = 'Please confirm to delete!';
  confirmClicked = false;
  cancelClicked = false;


  //set datatable
  booksArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  //Crud
  data: Book[] = [];
  books: Observable<Book[]>;
  book: Book = new Book();
  deleteMessage = false;
  booklist: any;
  isupdated = false;


  ngOnInit() {
    console.log('ngOnInit');

    //search
    this.search()
    // crud
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 15,
      stateSave: true,
      lengthMenu: [[15, 20, 25, -1], [15, 20, 25, "All"]],
      processing: true
    };
    this.bookService.getBookList().subscribe(data => {
      console.log(' this.bookService.getBookList()');
      console.log(data);
      console.log(this.data);
      console.log(data);
      this.data = data.books;
      this.dtTrigger.next();
    })
    // this.dtOptions = {
    //   pageLength: 15,
    //   stateSave: true,
    //   lengthMenu: [[15, 20, 25, -1], [15, 20, 25, "All"]],
    //   processing: true
    // };
    // this.bookService.getBookList().subscribe(data => {
    //   this.data = data;
    //   this.dtTrigger.next();
    // })
  }

  //pagination from server side
  // getRequestParams(page: number, pageSize: number): any {
  //   let params: any = {};

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }

  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }

  //   return params;
  // }

  // getBookList(): void {
  //   const params = this.getRequestParams(this.page, this.pageSize);

  //   this.bookService.getAll(params)
  //     .subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         this.data = data.books;
  //         this.totalItems = data.totalPassengers;
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // handlePageChange(event: number): void {
  //   this.page = event;
  //   this.getBookList();
  // }

  // handlePageSizeChange(event: any): void {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.getBookList();
  // }



  //crud app

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
    publisherName: new FormControl(),
    cag_name: new FormControl()
  });

  updateBk(updbk) {
    this.book = new Book();
    this.book.bid = this.Bid.value;
    this.book.bookName = this.BookName.value;
    this.book.authorName = this.AuthorName.value;
    this.book.publisherName = this.PublisherName.value;
    this.book.category.cag_name = this.CagName.value;
    console.log(this.BookName.value);
    console.log(this.AuthorName.value);
    console.log(this.PublisherName.value);
    console.log(this.CagName.value);


    this.bookService.updateBook(this.book.bid, this.book).subscribe(
      data => {
        this.isupdated = true;
        this.bookService.getBookList().subscribe(data => {
          this.data = data
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
  get CagName() {
    return this.bookupdateform.get('cag_name');
  }

  changeisUpdate() {
    this.isupdated = false;
  }

  //book details
  bookDetails(bid: number) {
    this.router.navigate(['view-details', bid]);
  }

  //category


}
