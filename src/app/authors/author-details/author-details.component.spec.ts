import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceMock } from '../../services/auth.service';
import { BooksService, BooksServiceMock } from '../../services/books.service';
import { AuthorsService, AuthorsServiceMock } from '../../services/authors.service';

import { AuthorDetailsComponent } from './author-details.component';

describe('AuthorDetailsComponent', () => {
  let component: AuthorDetailsComponent;
  let fixture: ComponentFixture<AuthorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [AuthorDetailsComponent],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: AuthorsService, useValue: AuthorsServiceMock },
        { provide: BooksService, useValue: BooksServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
