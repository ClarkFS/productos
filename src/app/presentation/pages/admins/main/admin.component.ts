import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Product } from '../../../../model/product.interface';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  productos: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productos = products;
        console.log(
          'Productos cargados:',
          JSON.stringify(this.productos, null, 2)
        );
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
      },
    });
  }

  deleteProduct(id: number) {
    console.log('Eliminando producto con ID:', id);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        console.log('Producto eliminado exitosamente');
      },
      error: (error) => {
        console.error('Error eliminando producto:', error);
        if (error.status === 0) {
          console.error('Error de CORS o servidor no disponible');
        }
      },
    });
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/actualizar', product.idProducto]);
  }
}
