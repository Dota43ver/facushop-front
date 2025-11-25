import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // <-- Importamos
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/auth.dto';
import { Router,RouterLink } from '@angular/router'; // <-- Importamos Router

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink,MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule], // <-- Añadimos ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Creamos el molde del formulario con validaciones
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] // Mínimo 6 caracteres
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.errorMessage = null;
    const request: RegisterRequest = this.registerForm.value;

    this.authService.register(request).subscribe({
      // El éxito (next) lo maneja el servicio (redirige al Home)
      error: (err) => {
        console.error("Error en el registro:", err);
        // (El backend podría devolver un error 400 si el email ya existe)
        this.errorMessage = "Error al registrar. Es posible que el email ya esté en uso.";
      }
    });
  }
}