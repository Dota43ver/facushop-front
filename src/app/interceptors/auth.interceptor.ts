import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  const token = authService.getToken(); // Obtenemos el token

  // Si no hay token, dejamos pasar la petición tal cual (ej. para Login)
  if (!token) {
    return next(req);
  }

  // Si hay token, clonamos la petición y le añadimos la cabecera
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Dejamos pasar la petición clonada (con el token)
  return next(authReq);
};