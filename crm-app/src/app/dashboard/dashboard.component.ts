import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import { Customer } from '../customer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.onStart();
  }

  onStart(): void{
    this.user = this.loginService.canActivate();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
