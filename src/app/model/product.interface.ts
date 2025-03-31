export interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  url_img: string;
  id_categoria: number;
  categoria?: Category;
}

export interface Category {
  id_categoria: number;
  nombre: string;
}
