import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  currentBook: Book;



  constructor(private route: ActivatedRoute, private router: Router, private location: Location,
    private bookService: BookService) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params.bid);
  }

  getBook(bid: number): void {
    this.bookService.getBook(bid)
      .subscribe(
        data => {
          this.currentBook = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  list() {
    this.router.navigate(['view-book']);
  }
}
