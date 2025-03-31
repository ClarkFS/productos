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
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productos: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Productos cargados:', JSON.stringify(products , null, 2));
        this.productos = products;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (success) => {
        if (success) {
          this.loadProducts(); // Recargar la lista después de eliminar
          console.log('Producto eliminado exitosamente');
        }
      },
      error: (error) => {
        console.error('Error eliminando producto:', error);
      }
    });
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/actualizar', product.id_producto]);
  }
}
