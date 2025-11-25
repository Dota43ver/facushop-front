import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// ¡Importamos las herramientas para formularios reactivos!
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/auth.dto';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  // ¡Añadimos ReactiveFormsModule a los imports!
  imports: [CommonModule, ReactiveFormsModule,RouterLink,MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string | null = null; // Para mostrar errores

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Creamos el "molde" del formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Se llama cuando el usuario presiona "Ingresar"
   */
  onSubmit(): void {
    // 1. Si el formulario no es válido, no hacemos nada
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Muestra errores si los campos están vacíos
      return;
    }
    
    // 2. Limpiamos errores previos
    this.errorMessage = null;

    // 3. Tomamos los valores del formulario
    const request: LoginRequest = this.loginForm.value;

    // 4. Llamamos al servicio de autenticación
    this.authService.login(request).subscribe({
      // El 'next' (éxito) no lo manejamos aquí, 
      // porque el servicio ya nos redirige al Home.
      
      error: (err) => {
        // Si el backend da un error (ej. 403), lo mostramos
        console.error("Error en el login:", err);
        this.errorMessage = "Email o contraseña incorrecta. Por favor, intentá de nuevo.";
      }
    });
  }

}