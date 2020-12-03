import { Component, OnInit } from '@angular/core';
import { faSync, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  faSync = faSync;
  faPlus = faPlus;

  public items = this.service.items$;

  constructor(private auth: AuthService, private service: AuthorsService) { }

  admin = () => this.auth.admin();

  ngOnInit(): void {
    this.service.index().then();
  }

  index = () => this.service.index();

}
