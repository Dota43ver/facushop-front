import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseDto } from '../interfaces/product.dto'; // <-- ¡Importá tu "molde"!
import { CategoryDto } from '../interfaces/category.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Esta es la URL base. Gracias al proxy, solo usamos /api
  private apiUrl = '/api/products'; 
  private categoriesUrl = '/api/categories';

  // Inyectamos el HttpClient que configuramos en app.config.ts
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los productos.
   */
  getProducts(): Observable<ProductResponseDto[]> {
    // Hacemos un GET a /api/products
    // Angular espera recibir un array de productos (ProductResponseDto[])
    return this.http.get<ProductResponseDto[]>(this.apiUrl);
  }

  /**
   * Obtiene un producto por su ID.
   */
  getProductById(id: number): Observable<ProductResponseDto> {
    return this.http.get<ProductResponseDto>(`${this.apiUrl}/${id}`);
  }
  
  // (Más adelante agregaremos createProduct, deleteProduct, etc.)

  /**
   * Obtiene todas las categorías para el selector.
   */
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.categoriesUrl);
  }

  /**
   * Crea un producto enviando datos e imagen.
   * Usamos FormData porque el backend espera 'multipart/form-data'.
   */
  createProduct(productData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    
    // Añadimos los campos de texto uno por uno
    // (Esto coincide con @ModelAttribute en el backend)
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('categoryId', productData.categoryId);

    // Añadimos la imagen
    formData.append('image', imageFile);

    return this.http.post(this.apiUrl, formData);
  }
}