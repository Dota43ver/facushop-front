// Este DTO es idéntico al CartItemDto, pero con un nombre más genérico
export interface OrderItemResponseDto {
  productId: number;
  productTitle: string;
  productImageUrl: string;
  quantity: number;
  priceAtPurchase: number;
  subtotal: number;
}

// Este DFTO es idéntico al CartResponseDto
// (Más adelante podríamos añadir campos como 'status' o 'createdAt')
export interface OrderResponseDto {
  orderId: number;
  items: OrderItemResponseDto[];
  totalAmount: number;
  // status?: string; // (Para el futuro)
  // createdAt?: string; // (Para el futuro)
}