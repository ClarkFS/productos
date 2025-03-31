import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../model/product.interface';
import { ApiConfig } from '../api/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private apiConfig: ApiConfig) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.product.getAll}`
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.product.getById(
        id
      )}`
    );
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.product.add}`,
      product
    );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.product.update(
        id
      )}`,
      product
    );
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.product.delete(
        id
      )}`
    );
  }

  // Categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.category.getAll}`
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiConfig.ApiUrlBase}${this.apiConfig.endpoints.category.getById(
        id
      )}`
    );
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    if (categoryId === 0) {
      return this.getProducts();
    }
    return this.http.get<Product[]>(
      `${this.apiConfig.ApiUrlBase}/api/products/by-category/${categoryId}`
    );
  }
}
