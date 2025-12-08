import { Injectable, StreamingResourceOptions } from '@angular/core';
import { CartItem } from './cart.service';
import { Address, User } from '../models/user';


export interface Purchase {
  id: number;
  userCorreo: string;
  fecha: Date;   
  items: CartItem[];
  total: number;
  direccion?: Address;
  enviadoAlAlmacen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
private purchase: Purchase[] = [];
private STORAGE_KEY = 'purchases';
 constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.purchase = JSON.parse(saved);
    }
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.purchase));
  }

  getAll(): Purchase[] {
    return this.purchase;
  }

addPurchase(user: User, items: CartItem[], direccion: Address | null, total: number) {
  const nuevaCompra: Purchase = {
    id: Date.now(),
    userCorreo: user.correo,
    fecha: new Date(),   
    items: items.map(i => ({ ...i })),
    total,
    direccion: direccion ?? undefined,
    enviadoAlAlmacen: false
  };

  this.purchase.push(nuevaCompra);
  this.save();
}


  marcarEnviado(id: number) {
    const compra = this.purchase.find(p => p.id === id);
    if (compra) {
      compra.enviadoAlAlmacen = !compra.enviadoAlAlmacen;
      this.save();
    }
  }
}

