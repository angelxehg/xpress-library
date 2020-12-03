import { Component, OnInit } from '@angular/core';
import { faSync, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  faSync = faSync;
  faPlus = faPlus;

  public items = this.service.items$;

  constructor(private auth: AuthService, private service: UsersService) { }

  admin = () => this.auth.admin();

  ngOnInit(): void {
    this.service.index().then();
  }

  index = () => this.service.index();

}
