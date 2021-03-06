import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Credential } from '../../services/auth.service';

interface ProcessStatus {
  status: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ready = true;

  statusMsg: ProcessStatus;

  credential: Credential = {
    email: '',
    password: '',
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.queryParams;
    if (params.email) {
      this.credential.email = params.email;
      this.statusMsg = { status: 'success', message: 'Cuenta creada. Inicie sesión' };
    }
  }

  ngOnInit(): void {
  }

  statusText(): string {
    if (!this.statusMsg) {
      return 'alert alert-dark';
    }
    return `alert alert-${this.statusMsg.status}`;
  }

  login(): void {
    this.statusMsg = null;
    this.ready = false;
    this.auth.login(this.credential).then(user => {
      this.statusMsg = { status: 'success', message: 'Inicio de sesión correcto' };
      setTimeout((router: Router) => {
        router.navigateByUrl('/');
      }, 1000, this.router);
    }).catch(err => {
      this.statusMsg = { status: 'danger', message: err.error.message };
    }).finally(() => {
      this.ready = true;
    });
  }

}
