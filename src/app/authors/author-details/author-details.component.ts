import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Author, AuthorsService } from '../authors.service';

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

  statusMsg: ProcessStatus;

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;

  author: Author;

  editMode = false;
  newMode = false;

  paramSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private service: AuthorsService,
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
        this.service.find(params.id).then(author => this.author = author);
      } else {
        this.editMode = true;
        this.newMode = true;
        this.author = {
          _id: 'new',
          name: '',
          country: ''
        };
      }
    });
  }

  save(): void {
    if (this.newMode) {
      this.service.create(this.author).then(author => {
        console.log('created');
        this.service.index().then(i => this.router.navigateByUrl(`/app/authors/${author._id}`));
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    } else {
      this.service.update(this.author).then(author => {
        this.editMode = false;
        this.author = author;
        console.log('updated');
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    }
  }

  delete(): void {
    this.service.delete(this.author).then(() => {
      this.service.index().then(i => this.router.navigateByUrl('/app/authors'));
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
