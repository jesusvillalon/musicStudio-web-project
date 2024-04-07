import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../pages.service';
import { ProductData } from 'src/environments/interfaces/productData.interface';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit{
  products: ProductData[] = [];
  category: string = '';
  constructor(private pagesService: PagesService) {}

  ngOnInit(): void {
    this.loadSelectedCategory();
  }

  getProductCategroy(category: string){
    this.pagesService.getProductByCategory(category).subscribe(
      product => this.products = product
    )
  }

  onCategerySelect(selectedCategory: string) {
    this.category = selectedCategory;
    localStorage.setItem('selectedCategory', selectedCategory);
    this.getProductCategroy(this.category);
  }

  loadSelectedCategory(): void {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      this.category = savedCategory;
      this.getProductCategroy(this.category);
    }
  }

}
