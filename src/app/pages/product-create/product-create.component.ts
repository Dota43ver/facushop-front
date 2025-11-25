import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryDto } from '../../interfaces/category.dto';

// Módulos de Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Para el dropdown de categorías
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  categories: CategoryDto[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar categorías al iniciar
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  // Detectar cuando el usuario selecciona un archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.selectedFile) {
      alert('Por favor completa todos los campos y selecciona una imagen.');
      return;
    }

    const productData = this.productForm.value;

    this.productService.createProduct(productData, this.selectedFile).subscribe({
      next: (res) => {
        console.log('Producto creado:', res);
        alert('¡Producto creado con éxito!');
        this.router.navigate(['/products']); // Volver al listado
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear el producto.');
      }
    });
  }
}