import { ShowDataComponent } from './show-data/show-data.component';
import { AuthGaurdService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from '../app/book-list/book-list.component';
import { CreateBookComponent } from '../app/create-book/create-book.component';
const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGaurdService] },
  { path: 'show-data', component: ShowDataComponent, canActivate: [AuthGaurdService] },
  { path: 'register', component: RegisterComponent },
  { path: 'view-book', component: BookListComponent, canActivate: [AuthGaurdService] },
  { path: 'add-book', component: CreateBookComponent, canActivate: [AuthGaurdService] },
  { path: 'view-details/:bid', component: BookDetailsComponent, canActivate: [AuthGaurdService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
