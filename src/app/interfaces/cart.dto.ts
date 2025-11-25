// Lo que recibimos del backend
export interface CartItemDto {
  productId: number;
  productTitle: string;
  productImageUrl: string;
  quantity: number;
  priceAtPurchase: number;
  subtotal: number;
}

export interface CartResponseDto {
  orderId: number;
  items: CartItemDto[];
  totalAmount: number;
}

// Lo que enviamos para añadir un item
export interface AddItemRequest {
  productId: number;
  quantity: number;
}