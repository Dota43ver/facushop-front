import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { OrderResponseDto } from '../../interfaces/order.dto';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,RouterLink,MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  public orders$: Observable<OrderResponseDto[]> | undefined;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Cargamos el historial de pedidos cuando el componente inicia
    this.orders$ = this.orderService.getOrderHistory();
  }
}