import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductData } from 'src/environments/interfaces/productData.interface';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private baseUrl = 'http://localhost:3000/products';


  constructor(private http: HttpClient) {}

  getProductByCategory(category: string): Observable<ProductData[]>{
    return this.http.get<ProductData[]>(`${this.baseUrl}/${category}`)
  }

  getOneProduct(category: string, product_id: string): Observable<ProductData>{
    return this.http.get<ProductData>(`${this.baseUrl}/${category}/${product_id}`)
  }


}
