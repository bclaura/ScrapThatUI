import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { ProductPriceHistory } from '../models/productPriceHistory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `http://localhost:5252/api/Products`;
  private productsCache: Product[] | null = null;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getLaptops(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/laptops');
  }

  getPhones(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/phones');
  }

  getTablets(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/tablets');
  }

  getSmartwatches(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/smartwatches');
  }

  getFitnessBracelets(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/fitness-bracelets');
  }

  getWirelessHeadphones(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/wireless-headphones');
  }

  getProductPriceHistory(productId: number): Observable<ProductPriceHistory[]> {
    return this.http.get<ProductPriceHistory[]>(this.apiUrl + `/pricehistory/${productId}`);
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + `/product/${productId}`);
  }
}
