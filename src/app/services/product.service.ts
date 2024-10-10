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

  getProducts(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '?isActive=true', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getLaptops(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/laptops?isActive=true', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getPhones(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/phones?isActive=true', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getTablets(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/tablets', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getSmartwatches(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/smartwatches', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getFitnessBracelets(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/fitness-bracelets', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getWirelessHeadphones(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/wireless-headphones', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getGames(page: number, pageSize: number, days: number, sort: string, platform: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/games', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort,
        platform: platform || ''
      }
    });
  }

  getManga(page: number, pageSize: number, days: number, sort: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/manga', {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        days: days.toString(),
        sort: sort
      }
    });
  }

  getProductPriceHistory(productId: number): Observable<ProductPriceHistory[]> {
    return this.http.get<ProductPriceHistory[]>(this.apiUrl + `/pricehistory/${productId}`);
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + `/product/${productId}`);
  }

  searchProducts(query: string, page: number, pageSize: number): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl + `/search`, {
      params: {
        query: query,
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });
  }
}
