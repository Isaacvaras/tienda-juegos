import { Component } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Address } from '../../models/user';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  selectedAddressIndex: number | null = null;

  constructor(
    public cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {
  
    if (this.addresses.length > 0) {
      this.selectedAddressIndex = 0;
    }
  }

  
  get items(): CartItem[] {
    return this.cartService.getItems();
  }

 
  get total(): number {
    return this.cartService.getTotal();
  }


  get extraWrapPrice(): number {
    return this.cartService.extraWrapPrice;
  }


  get addresses(): Address[] {
    return this.auth.getAddresses();
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


  irADireccion() {
    this.router.navigate(['/direccion']);
  }


  finalizarCompra() {
    if (this.items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    if (this.addresses.length === 0 || this.selectedAddressIndex === null) {
      alert('Selecciona o agrega una dirección antes de comprar.');
      return;
    }

    const direccionElegida = this.addresses[this.selectedAddressIndex];
    console.log('Compra realizada con envío a:', direccionElegida);

    alert('Compra realizada. ¡Gracias por tu pedido!');
    this.cartService.clear();
  }
}
