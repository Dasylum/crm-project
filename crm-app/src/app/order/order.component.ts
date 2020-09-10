import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders;

  constructor(private orderService: OrderService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(result => this.orders = result);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
