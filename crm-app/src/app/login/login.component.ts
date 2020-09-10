import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';


import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  onSubmit(loginCred): void {
    this.authService.login(loginCred).subscribe(result => {
      this.authService.setUserInfo({'user': result});
      this.router.navigate(['dashboard']);
    });
  }

}
