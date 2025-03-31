import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  ApiUrlBase: string = 'http://localhost:5018';

  endpoints = {
    product: {
      getAll: '/api/Products/List',
      getById: (id: number) => `/api/Products/${id}`,
      add: '/api/Products/Add',
      update: (id: number) => `/api/Products/Update/${id}`,
      delete: (id: number) => `/api/Products/Delete/${id}`,
    },
    category: {},
  };
}
