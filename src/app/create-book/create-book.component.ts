import { Category } from './../category';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  book: Book = new Book();
  submitted = false;

  ngOnInit() {
    this.submitted = false;
  }

  booksaveform = new FormGroup({
    bookName: new FormControl(),
    authorName: new FormControl(),
    publisherName: new FormControl(),
    cag_name: new FormControl()
  });

  saveBook(saveBook) {
    this.book = new Book();
    this.book.bookName = this.BookName.value;
    this.book.authorName = this.AuthorName.value;
    this.book.publisherName = this.PublisherName.value;
    this.book.category.cag_name = this.Category.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.bookService.createBook(this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
  }

  get BookName() {
    return this.booksaveform.get('bookName');
  }

  get AuthorName() {
    return this.booksaveform.get('authorName');
  }

  get PublisherName() {
    return this.booksaveform.get('publisherName');
  }
  get Category() {
    return this.booksaveform.get('cag_name');
  }


  addBookForm() {
    this.submitted = false;
    this.booksaveform.reset();
  }
  list() {
    this.router.navigate(['view-book']);
  }

  category: any;
  CategoryName = [
    { cid: 1, name: 'Văn hóa' },
    { cid: 2, name: 'Lịch sử' },
    { cid: 3, name: 'Khoa học' },
  ];

}
