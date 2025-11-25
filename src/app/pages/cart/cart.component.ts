import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartResponseDto, CartItemDto } from '../../interfaces/cart.dto';
import { Observable } from 'rxjs';
import { Router,RouterLink } from '@angular/router'; // Para el checkout
import { OrderService } from '../../services/order.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // Usamos un Observable para manejar la carga
  public cart$: Observable<CartResponseDto> | undefined;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart$ = this.cartService.getCart();
  }

  onRemoveItem(productId: number): void {
    console.log("Eliminando producto:", productId);
    this.cart$ = this.cartService.removeItem(productId);
    // (En una app real, añadimos .subscribe() y manejo de errores)
    // Por ahora, recargamos el Observable
  }

  // (Este es solo un placeholder, la lógica de checkout es más compleja)
  onCheckout(): void {
    console.log("Iniciando checkout...");
    
    this.orderService.createCheckoutSession().subscribe({
      next: (response) => {
        // ¡Éxito! Recibimos la URL de Mercado Pago
        console.log("Redirigiendo a Mercado Pago:", response.checkoutUrl);
        
        // Redirigimos al usuario a la pasarela de pago
        // (Usamos window.location.href para salir de la app de Angular)
        window.location.href = response.checkoutUrl;
      },
      error: (err) => {
        console.error("Error al crear el checkout:", err);
        alert("Hubo un error al iniciar el pago. Por favor, intentá de nuevo.");
      }
    });
  }
}