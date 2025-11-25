import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // <-- Importamos ActivatedRoute
import { ProductService } from '../../services/product.service';
import { ProductResponseDto } from '../../interfaces/product.dto';
import { CartService } from '../../services/cart.service'; // <-- ¡Importamos CartService!
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product$: Observable<ProductResponseDto> | undefined;
  public quantity: number = 1;

  constructor(
    private route: ActivatedRoute, // Para leer la URL
    private productService: ProductService,
    private cartService: CartService // Para el botón "Añadir"
  ) {}

  ngOnInit(): void {
    // 1. Leemos el 'id' de la URL
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      // 2. Llamamos al servicio para buscar ese producto
      // Usamos el 'pipe async' en el HTML, así que solo asignamos el Observable
      this.product$ = this.productService.getProductById(Number(productId));
    }
  }

  onAddToCart(product: ProductResponseDto): void {
    if (this.quantity <= 0) {
      alert("La cantidad debe ser al menos 1.");
      return;
    }

    const request = {
      productId: product.id,
      quantity: this.quantity // <-- ¡USA LA VARIABLE! (en lugar de '1')
    };
    
    this.cartService.addItem(request).subscribe({
      next: (cart) => {
        console.log("¡Producto añadido!", cart);
        alert(`"${product.title}" fue añadido a tu carrito.`);
      },
      error: (err) => {
        console.error("Error al añadir al carrito:", err);
        alert("Error al añadir producto. ¿Iniciaste sesión?");
      }
    });
  }
}