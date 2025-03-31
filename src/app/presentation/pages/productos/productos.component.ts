import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, Category } from '../../../model/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productos: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number = 0;
  loadedImages: { [key: number]: boolean } = {};
  imageLoaded = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = [{ idCategoria: 0, nombre: 'Todos' }, ...categories];
      },
      error: (error) => console.error('Error cargando categorías:', error),
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Productos:', products);
        this.productos = products;
      },
      error: (error) => console.error('Error cargando productos:', error),
    });
  }

  filtrarPorCategoria(categoriaId: number) {
    this.selectedCategory = categoriaId;
  }

  get productosFiltrados() {
    return this.selectedCategory === 0
      ? this.productos
      : this.productos.filter((p) => p.idCategoria === this.selectedCategory);
  }
  onImageLoad(productId: number) {
    this.loadedImages[productId] = true;
    this.imageLoaded = true;
  }
}
