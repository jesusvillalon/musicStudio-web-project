import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../pages.service';
import { ProductData } from 'src/environments/interfaces/productData.interface';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss']
})
export class OneProductComponent implements OnInit{
  public productData?: ProductData;
  public category: string = '';
  public products: ProductData[] = [];

  constructor(private pagesService: PagesService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.onLoadProduct();
  }

  onLoadProduct(){
    this.route.params.subscribe(params => {
      const category = params['category'];
      const productId = params['product_id'];
      if (category && productId) {
        this.category = category;
        this.getOneProduct(category, productId);
      }
    });
  };

  getOneProduct(category: string, product_id: string){
    this.pagesService.getOneProduct(category, product_id).subscribe(
      (response: ProductData) => {
        this.productData = response;
      },
      error => {
        console.log("Este es el error", error)
      }
    )
  }
  getProductCategroy(category: string) {
    this.pagesService
      .getProductByCategory(category)
      .subscribe((product) => {(this.products = product)}
    );
  }

  redirectToCategory() {
    this.getProductCategroy(this.category);
    this.router.navigate(['/products', this.category]);
  }




}
