import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './direccion.html'
})
export class Direccion {
  calle: string = '';
  distrito: string = '';
  recogerTienda: boolean = false;

  districts: string[] = [
    'Miraflores',
    'San Isidro',
    'Surco',
    'Pueblo Libre',
    'Magdalena'
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.distrito || !this.calle) return;

    this.authService.saveAddress({
      calle: this.calle,
      distrito: this.distrito,
      recogerTienda: this.recogerTienda
    });

   
    this.router.navigate(['/cart']);
  }
}
