import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Product, Category } from '../../../../model/product.interface';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      id_categoria: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      url_img: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCategories();
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

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Partial<Product> = {
        nombre: this.productForm.value.nombre,
        descripcion: this.productForm.value.descripcion,
        precio: Number(this.productForm.value.precio),
        stock: Number(this.productForm.value.stock),
        urlImg: this.productForm.value.url_img,
        idCategoria: Number(this.productForm.value.id_categoria),
      };

      this.productService.addProduct(newProduct).subscribe({
        next: (response) => {
          console.log('Producto agregado exitosamente:', response);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error al agregar producto:', error);
        }
      });
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productForm.patchValue({
          url_img: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
