import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';


// --- ¡AÑADÍ ESTAS IMPORTACIONES! ---
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // --- MODIFICÁ ESTA LÍNEA ---
    // Le decimos que provea el HttpClient Y que use nuestro interceptor
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimations()
]
};