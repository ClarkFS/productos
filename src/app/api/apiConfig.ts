import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  readonly ApiUrlBase: string = 'http://localhost:5015';

  endpoints = {
    product: {
      getAll: '/api/products/get-all',
      getById: (id: number) => `/api/products/get/${id}`,
      add: '/api/products/create',
      update: (id: number) => `/api/products/update/${id}`,
      delete: (id: number) => `/api/products/delete/${id}`,
    },
    category: {
      getAll: '/api/categories/get-all',
      getById: (id: number) => `/api/categories/get/${id}`,
      add: '/api/categories/create',
      update: (id: number) => `/api/categories/update/${id}`,
      delete: (id: number) => `/api/categories/delete/${id}`,
    },
  };
}
