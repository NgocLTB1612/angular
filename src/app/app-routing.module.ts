import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from '../app/book-list/book-list.component';
import { CreateBookComponent } from '../app/create-book/create-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-book', pathMatch: 'full' },
  { path: 'view-book', component: BookListComponent },
  { path: 'add-book', component: CreateBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
    
}