import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NgFor } from '@angular/common';

interface Game {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './catalog.html'
})
export class Catalog {
  games: Game[] = [
    { id: 1, name: 'Catan', price: 129.90, category: 'Estrategia' },
    { id: 2, name: 'Dixit', price: 99.90, category: 'Familiar' },
    { id: 3, name: 'Código Secreto', price: 89.90, category: 'Party' }
  ];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  addToCart(game: Game) {
    if (!this.authService.isLoggedIn()) {
    
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addItem({
      id: game.id,
      name: game.name,
      price: game.price
    });
  }
}

