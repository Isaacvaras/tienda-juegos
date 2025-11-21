import { Component } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf,DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  constructor(public cartService: CartService) {}

  get items(): CartItem[] {
    return this.cartService.getItems();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  get extraWrapPrice(): number {
    return this.cartService.extraWrapPrice;
  }

  onQuantityChange(item: CartItem, delta: number) {
    const newQty = item.quantity + delta;
    this.cartService.updateQuantity(item, newQty);
  }

  onFragileChange(item: CartItem, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.cartService.setFragile(item, checked);
  }

  onExtraWrapChange(item: CartItem, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.cartService.setExtraWrap(item, checked);
  }

  quitarItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  finalizarCompra() {
    if (this.items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Aquí podrías validar dirección, etc.
    alert('Compra realizada. ¡Gracias por tu pedido!');
    this.cartService.clear();
  }
}
