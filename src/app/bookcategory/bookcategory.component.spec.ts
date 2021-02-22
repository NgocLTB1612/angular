import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcategoryComponent } from './bookcategory.component';

describe('BookcategoryComponent', () => {
  let component: BookcategoryComponent;
  let fixture: ComponentFixture<BookcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
