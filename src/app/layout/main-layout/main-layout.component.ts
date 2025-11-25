import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // <-- ¡IMPORTÁ EL SERVICIO!

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,MatToolbarModule, MatButtonModule], 
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  // Inyectamos el AuthService
  constructor(public authService: AuthService) {}

  // Creamos un método para llamar al logout desde el HTML
  onLogout(): void {
    this.authService.logout();
  }
}