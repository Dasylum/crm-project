import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Form } from '@angular/forms';

import { Observable } from 'rxjs';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Product } from '../product';

import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-category-element',
  templateUrl: './category-element.component.html',
  styleUrls: ['./category-element.component.css']
})

export class CategoryElementComponent implements OnInit {

  category: Category[];
  productForm;
  products: Product[];

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCategory();
    this.getCategoryProducts();
    this.productForm = this.fb.group({
      name: '',
      price: '',
      quantity: ''
    });
  }

  getCategory(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.categoryService.getOneCategory(id).subscribe(result => this.category = result);
  }

  getCategoryProducts(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.categoryService.getProductsinCategory(id).subscribe(result => this.products = result);
  }

  onSubmit(ProductData): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.addProduct(ProductData as Product, id as string).subscribe(msg => window.location.reload());
  }

  goBack(): void{
    this.location.back();
  }

  deleteProduct(productId): void{
    this.productService.deleteProduct(productId).subscribe(result => this.router.navigate(['products']));
  }
}
