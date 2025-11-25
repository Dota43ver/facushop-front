import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponseDto } from '../interfaces/order.dto';

interface CheckoutResponse {
  checkoutUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = '/api/orders'; // Gracias al proxy
  private checkoutApiUrl = '/api/checkout';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el historial de pedidos del usuario logueado.
   * (El token se añade automáticamente por el interceptor)
   */
  getOrderHistory(): Observable<OrderResponseDto[]> {
    return this.http.get<OrderResponseDto[]>(`${this.apiUrl}/history`);
  }

  createCheckoutSession(): Observable<CheckoutResponse> {
    // Hacemos un POST a /api/checkout
    // El interceptor se encarga de añadir el token JWT
    return this.http.post<CheckoutResponse>(this.checkoutApiUrl, {});
  }
}