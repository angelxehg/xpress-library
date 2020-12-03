import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/users/users.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit, OnDestroy {

  user: User;

  paramSubscription: Subscription;

  constructor(private auth: AuthService) { }

  logout = () => this.auth.logout();

  ngOnInit(): void {
    this.user = this.auth.user();
  }

  ngOnDestroy(): void {
    console.log('Destroy CurrentUser component');
  }

}
