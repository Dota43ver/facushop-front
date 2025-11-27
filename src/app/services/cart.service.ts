import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddItemRequest, CartResponseDto } from '../interfaces/cart.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el carrito del usuario.
   * (El token se añade automáticamente por el interceptor)
   */
  getCart(): Observable<CartResponseDto> {
    return this.http.get<CartResponseDto>(this.apiUrl);
  }

  /**
   * Añade un item al carrito.
   */
  addItem(request: AddItemRequest): Observable<CartResponseDto> {
    return this.http.post<CartResponseDto>(`${this.apiUrl}/items`, request);
  }

  /**
   * Elimina un item del carrito.
   */
  removeItem(productId: number): Observable<CartResponseDto> {
    return this.http.delete<CartResponseDto>(`${this.apiUrl}/items/${productId}`);
  }
}