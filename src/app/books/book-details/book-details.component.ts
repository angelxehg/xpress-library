import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faSave, faTimes, faTrash, faSync, faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';
import { Book, BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { Author, AuthorsService } from '../../services/authors.service';

interface ProcessStatus {
  status: string;
  message: string;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  statusMsg: ProcessStatus;

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;
  faSync = faSync;
  faLink = faLink;
  faUnlink = faUnlink;

  bookId: string;
  book: Book;
  authors: Author[];
  availableAuthors: Author[];

  editMode = false;
  newMode = false;

  paramSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private service: BooksService,
    private authorsService: AuthorsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  admin = () => this.auth.admin();

  sync(): void {
    this.service.find(this.bookId).then(book => this.book = book);
    this.service.indexAuthors(this.bookId).then(authors => {
      this.authors = authors;
      const allIds = authors.map(i => i._id);
      this.authorsService.index().then(availableAuthors => {
        this.availableAuthors = availableAuthors.filter(i => !allIds.includes(i._id));
      });
    });
  }

  statusText(): string {
    if (!this.statusMsg) {
      return '';
    }
    return `text-${this.statusMsg.status}`;
  }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = false;
        this.newMode = false;
        this.bookId = params.id;
        this.sync();
      } else {
        this.editMode = true;
        this.newMode = true;
        this.book = {
          _id: 'new',
          title: ''
        };
        this.authors = null;
      }
    });
  }

  save(): void {
    if (this.newMode) {
      this.service.create(this.book).then(book => {
        this.service.index().then(i => this.router.navigateByUrl(`/books/${book._id}`));
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    } else {
      this.service.update(this.book).then(book => {
        this.editMode = false;
        this.book = book;
        this.service.index().then();
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    }
  }

  delete(): void {
    this.service.delete(this.book).then(() => {
      this.service.index().then(i => this.router.navigateByUrl('/books'));
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    });
  }

  linkAuthor(author: string): void {
    this.service.linkAuthor(this.bookId, author).then(() => {
      this.sync();
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    });
  }

  removeAuthor(author: string): void {
    this.service.removeAuthor(this.bookId, author).then(() => {
      this.sync();
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
