import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  showError = false;
  showSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  RegisterForm = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
    confirmar: ['', Validators.required],
    terminos: [false, Validators.requiredTrue]
  });

  registrar() {
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = '';

    if (this.RegisterForm.invalid) {
      this.RegisterForm.markAllAsTouched();
      this.showError = true;
      this.errorMessage = 'Revisa los campos marcados en rojo.';
      return;
    }

    const pass = this.RegisterForm.value.contraseña!;
    const confirm = this.RegisterForm.value.confirmar!;

    if (pass !== confirm) {
      this.showError = true;
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.RegisterForm.get('confirmar')?.setErrors({ mismatch: true });
      return;
    }

    const success = this.auth.register({
      nombre: this.RegisterForm.value.nombre!,
      correo: this.RegisterForm.value.correo!,
      contraseña: this.RegisterForm.value.contraseña!,
      // address se quedará undefined hasta que llene dirección al comprar
    } as any);

    if (!success) {
      this.showError = true;
      this.errorMessage = 'El correo ya está registrado.';
      return;
    }

    this.showSuccess = true;
  }
}
