import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, Category } from '../../../model/product.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Product[] = [
    {
      idProducto: 1,
      nombre: 'Chaqueta Denim Premium',
      descripcion: 'Chaqueta vaquera de corte clásico con acabados premium y botones metálicos',
      precio: 89.99,
      urlImg: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      categoria: { idCategoria: 1, nombre: 'Chaquetas' },
      stock: 23,
      idCategoria: 1
    }
  ];

  categories: Category[] = [
    { idCategoria: 0, nombre: 'Todos' },
    { idCategoria: 1, nombre: 'Chaquetas' },
    { idCategoria: 2, nombre: 'Pantalones' },
    { idCategoria: 3, nombre: 'Camisetas' },
    { idCategoria: 4, nombre: 'Accesorios' }
  ];

  selectedCategory: number = 0;

  loadedImages: { [key: number]: boolean } = {};
  imageLoaded = false;

  filtrarPorCategoria(categoriaId: number) {
    this.selectedCategory = categoriaId;
  }

  get productosFiltrados() {
    return this.selectedCategory === 0
      ? this.productos
      : this.productos.filter(p => p.idCategoria === this.selectedCategory);
  }

  onImageLoad(productId: number) {
    this.loadedImages[productId] = true;
    this.imageLoaded = true;
  }
}
