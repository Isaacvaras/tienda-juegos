import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgFor, DecimalPipe } from '@angular/common';
import { Alerts } from '../../utils/alerts';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService, Product } from '../../services/product.services';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, RouterModule, DecimalPipe,FormsModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css'],
})
export class Catalog {
  selectedCategory: string = 'Todas';
  categories: string[] = [];
  searchText: string = '';
  products: Product[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {
    this.products = this.productService.getProducts();
    this.categories = ['Todas', ...new Set(this.products.map((p) => p.category))];
  }

  addToCart(product: Product) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const currentQtyInCart =
      this.cartService.getItems().find((i) => i.id === product.id)?.quantity ?? 0;

    const stockDisponible = product.stock;

    if (currentQtyInCart >= stockDisponible) {
      Alerts.warning('No hay más stock disponible de este producto.');
      return;
    }

    this.cartService.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }
get filteredProducts() {
  let result = this.products;

  if (this.selectedCategory !== 'Todas') {
    result = result.filter(
      p => p.category === this.selectedCategory
    );
  }

  if (this.searchText.trim()) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  return result;
}

}
