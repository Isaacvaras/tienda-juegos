import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  fragile: boolean;
  extraWrap: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private items: CartItem[] = [];


  readonly extraWrapPrice = 5;


  getItems(): CartItem[] {
    return this.items;
  }


  addItem(product: { id: number; name: string; price: number }): void {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        fragile: false,
        extraWrap: false,
      });
    }
  }

  removeItem(item: CartItem): void {
    this.items = this.items.filter((i) => i !== item);
  }


  clear(): void {
    this.items = [];
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
    } else {
      item.quantity = quantity;
    }
  }

  
  setFragile(item: CartItem, fragile: boolean): void {
    item.fragile = fragile;
    if (!fragile) {

      item.extraWrap = false;
    }
  }


  setExtraWrap(item: CartItem, extraWrap: boolean): void {
    if (item.fragile) {
      item.extraWrap = extraWrap;
    } else {
      item.extraWrap = false;
    }
  }


  getItemTotal(item: CartItem): number {
    const base = item.price * item.quantity;
    const wrap = item.extraWrap ? this.extraWrapPrice * item.quantity : 0;
    return base + wrap;
  }


  getTotal(): number {
    return this.items.reduce((acc, item) => acc + this.getItemTotal(item), 0);
  }
}
