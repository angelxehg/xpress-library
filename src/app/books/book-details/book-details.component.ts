import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Book, BooksService } from '../books.service';
import { AuthService } from 'src/app/auth/auth.service';

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

  book: Book;

  editMode = false;
  newMode = false;

  paramSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private service: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  admin = () => this.auth.admin();

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
        this.service.find(params.id).then(book => this.book = book);
      } else {
        this.editMode = true;
        this.newMode = true;
        this.book = {
          _id: 'new',
          title: ''
        };
      }
    });
  }

  save(): void {
    if (this.newMode) {
      this.service.create(this.book).then(book => {
        console.log('created');
        this.service.index().then(i => this.router.navigateByUrl(`/app/books/${book._id}`));
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    } else {
      this.service.update(this.book).then(book => {
        this.editMode = false;
        this.book = book;
        console.log('updated');
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    }
  }

  delete(): void {
    this.service.delete(this.book).then(() => {
      this.service.index().then(i => this.router.navigateByUrl('/app/books'));
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
