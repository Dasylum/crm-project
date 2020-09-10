import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { LoginService } from '../login.service';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  categoryForm;

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getCategories();
    this.categoryForm = this.fb.group({
      name: ''
    })
  }

  getCategories(): void{
    this.categoryService.getCategory().subscribe(category => this.categories = category );
  }

  onSubmit(categoryData): void {
    this.categoryService.addCategory(categoryData).subscribe(msg => window.location.reload());
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  onClick(): void {
    var formbtn = document.getElementById('formbtn');
    formbtn.style.display = 'none';

    var cancelbtn = document.getElementById('cancelbtn');
    cancelbtn.style.display = 'block';

    var form = document.getElementById('form');
    form.style.display = 'block';
  }

  goback(): void {
    var formbtn = document.getElementById('formbtn');
    formbtn.style.display = 'block';

    var cancelbtn = document.getElementById('cancelbtn');
    cancelbtn.style.display = 'none';

    var form = document.getElementById('form');
    form.style.display = 'none';
  }
}
