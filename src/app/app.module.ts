import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CreateBookComponent } from './create-book/create-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { BookcategoryComponent } from './bookcategory/bookcategory.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateBookComponent,
    BookListComponent,
    BookcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
