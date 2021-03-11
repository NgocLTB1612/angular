import { FilterPipe } from './filter-pipe';
import { BookService } from './book.service';
import { AuthGaurdService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CreateBookComponent } from './create-book/create-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { BookcategoryComponent } from './bookcategory/bookcategory.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from './auth-interceptor';
import { ShowDataComponent } from './show-data/show-data.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    CreateBookComponent,
    BookListComponent,
    BookcategoryComponent,
    LoginComponent,
    RegisterComponent,
    BookDetailsComponent,
    HomeComponent,
    BoardUserComponent,
    ProfileComponent,
    ShowDataComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    DataTablesModule,
    NgxPaginationModule,
    FontAwesomeModule,

    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm',
    }),

  ],
  entryComponents: [],
  providers: [AuthService, AuthGaurdService, BookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
