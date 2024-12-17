import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SupplierService } from './core/services/supplier.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Suppliers';
  suppliers: any[] = [];

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: (data) => {
        // Verifica que 'data.value' contenga un array de proveedores
        if (data && Array.isArray(data.value)) {
          this.suppliers = data.value;  // Asigna el array de proveedores
        } else {
          console.error('La respuesta no contiene un array de proveedores');
        }
        console.log('Proveedores cargados:', this.suppliers);
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
      }
    });
  }
}
