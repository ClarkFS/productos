import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Category } from '../model/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productos: Product[] = [
    {
      id_producto: 1,
      nombre: 'Chaqueta Denim Premium',
      descripcion: 'Chaqueta vaquera de corte clásico con acabados premium',
      precio: 89.99,
      url_img: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      categoria: { id_categoria: 1, nombre: 'Chaquetas' },
      stock: 23,
      id_categoria: 1
    }
  ];

  private categories: Category[] = [
    { id_categoria: 1, nombre: 'Chaquetas' },
    { id_categoria: 2, nombre: 'Pantalones' },
    { id_categoria: 3, nombre: 'Camisetas' },
    { id_categoria: 4, nombre: 'Accesorios' }
  ];

  constructor() { }

  // Productos CRUD
  getProducts(): Observable<Product[]> {
    return of(this.productos);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.productos.find(p => p.id_producto === id);
    return of(product);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id_producto: this.getNextId(),
      categoria: this.categories.find(c => c.id_categoria === product.id_categoria)
    } as Product;
    
    this.productos.push(newProduct);
    return of(newProduct);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product | undefined> {
    const index = this.productos.findIndex(p => p.id_producto === id);
    if (index !== -1) {
      this.productos[index] = { 
        ...this.productos[index], 
        ...product,
        categoria: this.categories.find(c => c.id_categoria === product.id_categoria)
      };
      return of(this.productos[index]);
    }
    return of(undefined);
  }

  deleteProduct(id: number): Observable<boolean> {
    const initialLength = this.productos.length;
    this.productos = this.productos.filter(p => p.id_producto !== id);
    return of(initialLength !== this.productos.length);
  }

  // Categorías
  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(id: number): Observable<Category | undefined> {
    return of(this.categories.find(c => c.id_categoria === id));
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    if (categoryId === 0) {
      return of(this.productos);
    }
    return of(this.productos.filter(p => p.id_categoria === categoryId));
  }

  // Utilidades
  private getNextId(): number {
    return Math.max(...this.productos.map(p => p.id_producto), 0) + 1;
  }
}
