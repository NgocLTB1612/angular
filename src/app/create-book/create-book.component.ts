import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private bookService : BookService) { }

  book: Book= new Book();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  booksaveform=new FormGroup({
    bookName:new FormControl(),
    authorName:new FormControl(),
    publisherName:new FormControl()
  });

  saveBook(saveBook){
    this.book=new Book();   
    this.book.bookName=this.BookName.value;
    this.book.authorName=this.AuthorName.value;
    this.book.publisherName=this.PublisherName.value;
    this.submitted = true;
    this.save();
  }

  

  save() {
    this.bookService.createBook(this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
  }

  get BookName(){
    return this.booksaveform.get('bookName');
  }

  get AuthorName(){
    return this.booksaveform.get('authorName');
  }

  get PublisherName(){
    return this.booksaveform.get('publisherName');
  }

  addBookForm(){
    this.submitted=false;
    this.booksaveform.reset();
  }
}