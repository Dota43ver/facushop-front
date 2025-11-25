import { CategoryDto } from "./category.dto";
import { SellerDto } from "./seller.dto";

export interface ProductResponseDto {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryDto;
  seller: SellerDto;
  stock: number; // ¡Añadimos el stock!
}