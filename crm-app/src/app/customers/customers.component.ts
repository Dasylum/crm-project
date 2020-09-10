import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Customer } from '../customer';
import { CustomerServiceService } from '../customer-service.service';
import { LoginService } from '../login.service';

import { variable } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers : Customer[];
  customerDetails;
  customerForm;

  constructor(private CustomerService: CustomerServiceService, private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    console.log("hello world!!");
    this.getCustomers();
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      memberStatus: false,
    });
  }

  getCustomers(): void {
    console.log("hello world");
    this.CustomerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  onSubmit(customerData) {
    this.CustomerService.addCustomer( customerData as Customer).subscribe(customers=> this.router.navigate(['dashboard']));
    
    console.warn('Your order has been submitted', customerData);
  }

  search(name) {
    this.CustomerService.searchCustomers(name).subscribe(customer => console.log(customer));
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  onClick(): void {
    var form = document.getElementById('form');
    form.style.display = 'block';

    var btn = document.getElementById('formbtn');
    btn.style.display = 'none';

    var cancelbtn = document.getElementById('cancelbtn');
    cancelbtn.style.display = 'block';
  }

  goback(): void {
    var form = document.getElementById('form');
    form.style.display = 'none';

    var btn = document.getElementById('formbtn');
    btn.style.display = 'block';

    var cancelbtn = document.getElementById('cancelbtn');
    cancelbtn.style.display = 'none';
  }
}