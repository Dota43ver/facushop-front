import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  // "Inject" es la forma moderna de inyectar servicios en una función
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Revisamos si el usuario está logueado
  if (authService.isLoggedIn()) {
    return true; // ¡Sí, puede pasar!
  }
  
  // 2. Si no, lo redirigimos al login
  console.log("Acceso denegado - Redirigiendo a /login");
  router.navigate(['/login']);
  return false; // ¡No, no puede pasar!
};