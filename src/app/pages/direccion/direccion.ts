import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { Address } from '../../models/user';

@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './direccion.html',
  styleUrl: './direccion.css'
})
export class Direccion {


  calle: string = '';
  distrito: string = '';
  recogerTienda: boolean = false;


  districts: string[] = [
    'Miraflores',
    'San Isidro',
    'Surco',
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  guardarDireccion() {
    if (!this.recogerTienda) {
      if (!this.calle.trim() || !this.distrito.trim()) {
        alert('Para envío a domicilio debes ingresar calle y distrito.');
        return;
      }
    }

    const nuevaDireccion: Address = {
      calle: this.calle,
      distrito: this.distrito,
      recogerTienda: this.recogerTienda
    };

    this.auth.saveAddress(nuevaDireccion);

    alert('Dirección guardada correctamente');
    this.router.navigate(['/cart']);
  }
}

