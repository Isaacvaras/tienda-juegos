import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { PurchaseService, Purchase } from '../../services/purchase.service';
import { AuthService } from '../../services/auth.service';
import { Product, ProductService } from '../../services/product.services';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, DecimalPipe, NgClass],
  templateUrl: './administracion.html',
  styleUrl: './administracion.css',
})
export class Admin {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(
    private purchaseService: PurchaseService,
    private auth: AuthService,
    private router: Router,
    private productService: ProductService
  ) {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/login']);
    }
  }

  get compras(): Purchase[] {
    return this.purchaseService.getAll();
  }

  toggleEnviado(compra: Purchase) {
    this.purchaseService.marcarEnviado(compra.id);
  }
  updateStock(productId: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const stock = Number(value);

    if (isNaN(stock)) return;

    this.productService.updateStock(productId, stock);
  }
}
