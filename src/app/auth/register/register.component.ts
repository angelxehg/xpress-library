import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Credential } from '../../services/auth.service';

interface ProcessStatus {
  status: string;
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ready = true;

  statusMsg: ProcessStatus;

  credential: Credential = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: 'https://escuelafractal.com/wp-content/uploads/2020/02/pq_800.png'
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  statusText(): string {
    if (!this.statusMsg) {
      return 'alert alert-dark';
    }
    return `alert alert-${this.statusMsg.status}`;
  }

  register(): void {
    this.statusMsg = null;
    try {
      this.ready = false;
      this.auth.register(this.credential).then(user => {
        this.statusMsg = { status: 'success', message: 'Registro correcto' };
        setTimeout((router: Router) => {
          router.navigateByUrl(`/auth/login?email=${user.email}`);
        }, 1000, this.router);
      }).catch(err => {
        this.statusMsg = { status: 'danger', message: err.error.message };
      }).finally(() => {
        this.ready = true;
      });
    } catch (err) {
      this.statusMsg = { status: 'danger', message: err.error.message };
      this.ready = true;
    }
  }

}
