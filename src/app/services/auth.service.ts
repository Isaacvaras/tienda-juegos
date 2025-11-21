import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Address } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Usuarios de ejemplo + los que se registren
  private users: User[] = [{ correo: 'admin@gmail.com', nombre: 'admin', contraseña: 'admin123' }];

  private currentUser: User | null = null;

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  register(user: User): boolean {
    const exists = this.users.some((u) => u.correo === user.correo);
    if (exists) return false; // ya existe

    this.users.push(user);
    this.currentUser = user;
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, contraseña: string): boolean {
    const user = this.users.find((u) => u.correo === email && u.contraseña === contraseña);
    if (!user) return false;

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;

    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Guardar o actualizar dirección
  saveAddress(address: Address): void {
    const user = this.getCurrentUser();
    if (!user) return;
    user.address = address;

    // actualizar en la lista y en localStorage
    const idx = this.users.findIndex((u) => u.correo === user.correo);
    if (idx !== -1) {
      this.users[idx] = user;
    }
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  hasAddress(): boolean {
    const user = this.getCurrentUser();
    return !!(user && user.address);
  }
}
