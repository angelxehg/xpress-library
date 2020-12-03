import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceMock } from '../../services/auth.service';
import { AuthorsService, AuthorsServiceMock } from '../../services/authors.service';
import { BooksService, BooksServiceMock } from '../../services/books.service';

import { BookDetailsComponent } from './book-details.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [BookDetailsComponent],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: AuthorsService, useValue: AuthorsServiceMock },
        { provide: BooksService, useValue: BooksServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
