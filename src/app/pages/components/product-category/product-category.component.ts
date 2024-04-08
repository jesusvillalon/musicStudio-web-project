import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../pages.service';
import { ProductData } from 'src/environments/interfaces/productData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit{
  public products: ProductData[] = [];
  public category: string = '';
  public categoryProducts?: ProductData;

  constructor(private pagesService: PagesService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadSelectedCategory();
    this.getProductCategory(this.category);
  }

  getProductCategory(category: string){
    this.pagesService.getProductByCategory(category).subscribe(
      product => this.products = product
    )
  }

  onCategerySelect(selectedCategory: string) {
    this.category = selectedCategory;
    localStorage.setItem('selectedCategory', selectedCategory);
    this.getProductCategory(this.category);
  }

  loadSelectedCategory(): void {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      this.category = savedCategory;
      this.getProductCategory(this.category);
    }
  }

  viewProduct(category: string, product_id: string){
    this.router.navigate(['/products', category, product_id]);
  }

}
