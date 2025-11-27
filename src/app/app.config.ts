import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';


// --- ¡AÑADÍ ESTAS IMPORTACIONES! ---
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // Volvemos al router normal
    provideRouter(routes), 
    
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])) 
  ]
};