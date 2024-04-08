import { Component, OnInit } from '@angular/core';
import { Benefits } from 'src/app/shared/interfaces/benefits.interface';
import { Brands } from 'src/app/shared/interfaces/brands.interface';
import { HomeCategories, InitialCategories } from 'src/app/shared/interfaces/home-categories.interface';
import { ProductData } from 'src/environments/interfaces/productData.interface';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';
import { benefits1, benefits2, brands, categories1, categories2, initialCategories } from './home-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public initialCategories = initialCategories;
  public categories1 = categories1;
  public categories2 = categories2;
  public benefits1 = benefits1;
  public benefits2 = benefits2;
  public brands = brands;
  public products: ProductData[] = [];
  public category: string = '';

  constructor(private pagesService: PagesService,
   private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSelectedCategory();
  }

  getProductCategory(category: string) {
    this.pagesService
      .getProductByCategory(category)
      .subscribe((product) => (this.products = product));
  }

  onCategorySelect(selectedCategory: string) {
    this.category = selectedCategory;
    localStorage.setItem('selectedCategory', selectedCategory);
    this.getProductCategory(this.category);
    this.router.navigate(['/products', selectedCategory]);
  }

  loadSelectedCategory(): void {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      this.category = savedCategory;
      this.getProductCategory(this.category);

    }
  }


}
