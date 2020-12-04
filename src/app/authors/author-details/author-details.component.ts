import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faSave, faTimes, faTrash, faSync, faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Author, AuthorsService } from '../../services/authors.service';
import { Book, BooksService } from '../../services/books.service';

interface ProcessStatus {
  status: string;
  message: string;
}

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {

  ready = true;

  statusMsg: ProcessStatus;

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;
  faSync = faSync;
  faLink = faLink;
  faUnlink = faUnlink;

  authorID: string;
  author: Author;
  books: Book[];
  availableBooks: Book[];

  editMode = false;
  newMode = false;

  paramSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private service: AuthorsService,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  admin = () => this.auth.admin();

  sync(): void {
    this.service.find(this.authorID).then(author => this.author = author);
    this.service.indexBooks(this.authorID).then(books => {
      this.books = books;
      const allIds = books.map(i => i._id);
      this.booksService.index().then(availableBooks => {
        this.availableBooks = availableBooks.filter(i => !allIds.includes(i._id));
      });
    });
  }

  statusText(): string {
    if (!this.statusMsg) {
      return 'alert alert-dark';
    }
    return `alert alert-${this.statusMsg.status}`;
  }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = false;
        this.newMode = false;
        this.authorID = params.id;
        this.sync();
      } else {
        this.editMode = true;
        this.newMode = true;
        this.authorID = '';
        this.author = {
          _id: 'new',
          name: '',
          country: ''
        };
        this.books = null;
      }
    });
  }

  save(): void {
    this.ready = false;
    if (this.newMode) {
      this.service.create(this.author).then(author => {
        this.service.index().then(i => this.router.navigateByUrl(`/authors/${author._id}`));
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      }).finally(() => {
        this.ready = true;
      });
    } else {
      this.service.update(this.author).then(author => {
        this.editMode = false;
        this.author = author;
        this.service.index().then();
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      }).finally(() => {
        this.ready = true;
      });
    }
  }

  delete(): void {
    this.ready = false;
    this.service.delete(this.author).then(() => {
      this.service.index().then(i => this.router.navigateByUrl('/authors'));
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    }).finally(() => {
      this.ready = true;
    });
  }

  linkBook(book: string): void {
    this.ready = false;
    this.service.linkBook(this.authorID, book).then(() => {
      this.sync();
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    }).finally(() => {
      this.ready = true;
    });
  }

  removeBook(book: string): void {
    this.ready = false;
    this.service.removeBook(this.authorID, book).then(() => {
      this.sync();
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    }).finally(() => {
      this.ready = true;
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
