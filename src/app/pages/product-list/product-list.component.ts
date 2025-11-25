import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'; // Importamos el servicio
import { ProductResponseDto } from '../../interfaces/product.dto'; // Importamos el DTO
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service'; // <-- ¡IMPORTÁ EL CART SERVICE!


@Component({
  selector: 'app-product-list',
  standalone: true,
  // ¡Importamos CommonModule para poder usar *ngFor!
  imports: [CommonModule, RouterLink,
    MatCardModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  public products: ProductResponseDto[] = [];

  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
    console.log("Cargando lista de productos...");
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log("Productos recibidos!", this.products);
      },
      error: (err) => {
        console.error("Error al obtener productos:", err);
      }
    });
  }

  onAddToCart(product: ProductResponseDto): void {
    if (product.stock === 0) {
      alert("¡No hay stock de este producto!");
      return;
    }
    
    const request = {
      productId: product.id,
      quantity: 1 // Añadimos 1 por defecto desde la lista
    };

    this.cartService.addItem(request).subscribe({
      next: () => {
        alert(`"${product.title}" fue añadido a tu carrito.`);
      },
      error: (err) => {
        console.error("Error al añadir al carrito:", err);
        alert("Error al añadir producto. ¿Iniciaste sesión?");
      }
    });
  }

  
}