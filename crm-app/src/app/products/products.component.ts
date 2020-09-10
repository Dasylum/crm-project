import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from '../product.service';
import { Product } from '../product';
import { LoginService } from '../login.service';
import { OrderService } from '../order.service';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  productForm;
  user;

  constructor(private productService: ProductService, 
              private fb: FormBuilder, 
              private loginService: LoginService, 
              private router: Router, 
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCustomer();
  }

  getCustomer(): void {
    this.user = this.loginService.canActivate();
  }

  getProducts(): void{
    this.productService.getProducts().subscribe(product => this.products = product )
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  order(productId, customerId): void {
    this.orderService.placeOrder(productId, customerId).subscribe(result => this.router.navigate(['orders']));
  }
}
