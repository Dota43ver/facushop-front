import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component'; // <-- ¡IMPORTÁ EL NUEVO!
import { ProductDetailComponent } from './pages/product-detail/product-detail.component'; // <-- ¡IMPORTÁ EL NUEVO!
import { ProductCreateComponent } from './pages/product-create/product-create.component';

export const routes: Routes = [
  // --- Ruta Principal (Layout) ---
  // Cuando el usuario entra a la raíz "localhost:4200/"
  {
    path: '',
    component: MainLayoutComponent, // Carga el Layout (Nav + Footer)
    
    // Y dentro del <router-outlet> del layout, carga estas "hijas":
    children: [
      {
        path: '', // La ruta vacía (default)
        component: HomeComponent // Muestra la página Home
      },
      {
        path: 'products', // "localhost:4200/products"
        component: ProductListComponent // Muestra la lista de productos
      },
      {
        path: 'login', // "localhost:4200/login"
        component: LoginComponent
      },
      { 
        path: 'register', // "localhost:4200/register"
        component: RegisterComponent
      },
      { 
        path: 'cart', 
        component: CartComponent, // <-- ¡ESTE ES EL CAMBIO! (Reemplazá HomeComponent)
        canActivate: [authGuard] 
      },
      { 
        path: 'profile/orders', 
        component: OrderHistoryComponent, // <-- ¡REEMPLAZÁ HomeComponent!
        canActivate: [authGuard] 
      },
      { 
        path: 'products/create', 
        component: ProductCreateComponent,
        canActivate: [authGuard] 
      },
      { 
        path: 'products/:id', 
        component: ProductDetailComponent 
      },
      

      // (Aquí agregaremos '/login', '/cart', '/product/:id', etc.)
    ]
  },

  // (Opcional: aquí irían rutas que NO usen el layout, ej. 404)
  // { path: '**', component: NotFoundPageComponent }
];