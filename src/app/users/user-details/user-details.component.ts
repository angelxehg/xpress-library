import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User, UsersService } from '../users.service';

interface ProcessStatus {
  status: string;
  message: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  statusMsg: ProcessStatus;

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;

  user: User;

  editMode = false;
  newMode = false;

  paramSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private service: UsersService,
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
        this.service.find(params.id).then(user => this.user = user);
      } else {
        this.editMode = true;
        this.newMode = true;
        this.user = {
          _id: 'new',
          name: '',
          email: '',
          image: ''
        };
      }
    });
  }

  save(): void {
    if (this.newMode) {
      this.service.create(this.user).then(user => {
        console.log('created');
        this.service.index().then(i => this.router.navigateByUrl(`/app/users/${user._id}`));
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    } else {
      this.service.update(this.user).then(user => {
        this.editMode = false;
        this.user = user;
        console.log('updated');
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      });
    }
  }

  delete(): void {
    this.service.delete(this.user).then(() => {
      this.service.index().then(i => this.router.navigateByUrl('/app/users'));
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
