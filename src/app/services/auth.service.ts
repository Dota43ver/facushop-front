import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from '../interfaces/auth.dto';
import { RegisterRequest } from '../interfaces/auth.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth'; // La URL base de autenticación (gracias al proxy)
  private readonly TOKEN_KEY = 'authToken'; // La "llave" para guardar el token

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Envía los datos al backend para registrar un nuevo usuario.
   */
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => {
        // Después de registrarse, el backend nos da un token.
        // Hacemos lo mismo que en el login:
        localStorage.setItem(this.TOKEN_KEY, response.token);
        console.log("Usuario registrado, token guardado.");
        
        // Redirigimos al Home
        this.router.navigate(['/']); 
      })
    );
  }

  /**
   * Envía las credenciales al backend para loguearse.
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      // 'tap' nos permite "espiar" la respuesta exitosa
      tap(response => {
        // 1. Guardamos el token en localStorage
        localStorage.setItem(this.TOKEN_KEY, response.token);
        console.log("Usuario logueado, token guardado.");
        
        // 2. Redirigimos al Home
        this.router.navigate(['/']); 
      })
    );
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    // 1. Borramos el token
    localStorage.removeItem(this.TOKEN_KEY);
    console.log("Usuario deslogueado.");

    // 2. Redirigimos al Login
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene el token guardado.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Revisa si el usuario está logueado (si existe un token).
   */
  isLoggedIn(): boolean {
    // !! (doble negación) convierte un string (o null) en un booleano
    return !!this.getToken();
  }

  // Más adelante, aquí irá la lógica de registro (register)
}