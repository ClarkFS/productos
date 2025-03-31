import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product, Category } from '../../../../model/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  productForm: FormGroup;
  productId: number = 0;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      idCategoria: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      urlImg: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductData();
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error cargando categorías:', error);
      }
    });
  }

  loadProductData() {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            idCategoria: product.idCategoria,
            stock: product.stock, 
            urlImg: product.urlImg
          });
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        console.error('Error cargando producto:', error);
        this.router.navigate(['/admin']);
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Partial<Product> = {
        ...this.productForm.value,
        precio: Number(this.productForm.value.precio),
        stock: Number(this.productForm.value.stock),
        idCategoria: Number(this.productForm.value.idCategoria)
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: (response) => {
          console.log('Producto actualizado exitosamente:', response);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/admin']);
  }
}
