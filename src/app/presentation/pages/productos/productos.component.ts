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
      id_producto: 1,
      nombre: 'Chaqueta Denim Premium',
      descripcion: 'Chaqueta vaquera de corte clásico con acabados premium y botones metálicos',
      precio: 89.99,
      url_img: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      categoria: { id_categoria: 1, nombre: 'Chaquetas' },
      stock: 23,
      id_categoria: 1
    }
  ];

  categories: Category[] = [
    { id_categoria: 0, nombre: 'Todos' },
    { id_categoria: 1, nombre: 'Chaquetas' },
    { id_categoria: 2, nombre: 'Pantalones' },
    { id_categoria: 3, nombre: 'Camisetas' },
    { id_categoria: 4, nombre: 'Accesorios' }
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
      : this.productos.filter(p => p.id_categoria === this.selectedCategory);
  }

  onImageLoad(productId: number) {
    this.loadedImages[productId] = true;
    this.imageLoaded = true;
  }
}
