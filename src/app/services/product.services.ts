import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // 👈 OJO: importamos map desde 'rxjs'

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private STORAGE_KEY = 'products';
  private products: Product[] = [];

  private API_URL = 'https://f7sjr2xc10.execute-api.us-east-1.amazonaws.com/prod/productos';

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.products = JSON.parse(saved);
    } else {
      this.products = [];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.products));
  }


  fetchProductsFromApi(): Observable<Product[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map((res: any) => {
     
        if (Array.isArray(res)) {
          return res as Product[];
        }

        
        if (res && typeof res.body === 'string') {
          try {
            const parsed = JSON.parse(res.body);
            if (Array.isArray(parsed)) {
              return parsed as Product[];
            }
          } catch (e) {
            console.error('No se pudo parsear res.body como JSON:', res.body);
          }
        }

        console.warn('Respuesta inesperada de la API, devolviendo []:', res);
        return [] as Product[];
      })
    );
  }

  setProductsFromApi(products: Product[]) {
    this.products = products;
    this.save();
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  decreaseStockForItems(items: { id: number; quantity: number }[]) {
    for (const item of items) {
      const product = this.getProductById(item.id);
      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0);
      }
    }
    this.save();
  }

  updateStock(productId: number, newStock: number) {
    const product = this.getProductById(productId);
    if (product) {
      product.stock = Math.max(0, newStock);
      this.save();
    }
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const newId =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id)) + 1
        : 1;
    const newProduct: Product = { ...product, id: newId };

    this.products.push(newProduct);
    this.save();

    return newProduct;
  }

  updateProduct(id: number, updates: Partial<Product>): boolean {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) return false;

    this.products[index] = { ...this.products[index], ...updates };
    this.save();

    return true;
  }

  deleteProduct(id: number): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);

    if (this.products.length === initialLength) return false;

    this.save();
    return true;
  }
}
