import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../services/users.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  user: User;

  paramSubscription: Subscription;

  constructor(private auth: AuthService) { }

  logout = () => this.auth.logout();

  ngOnInit(): void {
    this.user = this.auth.user();
  }

}
