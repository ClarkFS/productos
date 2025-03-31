export interface Product {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  urlImg: string;
  idCategoria: number;
  categoria: Category | null;
}

export interface Category {
  idCategoria: number;
  nombre: string;
}
