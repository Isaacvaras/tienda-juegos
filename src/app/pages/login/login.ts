import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  showError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  LoginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', Validators.required]
  });

  Entrar() {
    this.showError = false;
    this.errorMessage = '';

    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      this.errorMessage = 'Completa correctamente todos los campos.';
      this.showError = true;
      return;
    }

    const correo = this.LoginForm.value.correo!;
    const contraseña = this.LoginForm.value.contraseña!;

  
    const logged = this.auth.login(correo, contraseña);

    if (!logged) {
      this.errorMessage = 'Correo o contraseña incorrectos.';
      this.showError = true;
      return;
    }

    this.router.navigate(['/home']);
  }
}
