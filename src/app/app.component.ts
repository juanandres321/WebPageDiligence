import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from './core/services/supplier.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Suppliers';
  suppliers: any[] = [];
  form: FormGroup; // Formulario reactivo

  constructor(private supplierService: SupplierService, private fb: FormBuilder) {
    // Configurar el formulario
    this.form = this.fb.group({
      companyName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      tradeName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      taxIdentification: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      telephoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      eMail: ['', [Validators.required, Validators.email]],
      webPage: ['', [Validators.required, Validators.pattern(/https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]],
      adress: ['', [Validators.required]],
      country: ['', [Validators.required]],
      annualTurnover: ['', [Validators.required, Validators.min(0)]],
      lastEdition: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  //Cargar los proveedores
  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.value)) {
          this.suppliers = data.value;
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

  // Método para eliminar un proveedor
  deleteSupplier(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.suppliers = this.suppliers.filter(supplier => supplier.idSupplier !== id);
          console.log(`Proveedor con id ${id} eliminado.`);
        },
        error: (err) => {
          console.error('Error al eliminar el proveedor:', err);
        }
      });
    }
  }

  // Método para crear un nuevo proveedor
  createSupplier(): void {
    if (this.form.valid) {
      const newSupplier = this.form.value;
      this.supplierService.createSupplier(newSupplier).subscribe({
        next: (response) => {
          console.log('Proveedor creado con éxito:', response);
          this.form.reset();
          this.loadSuppliers(); // Recargar la lista de proveedores
        },
        error: (err) => {
          console.error('Error al crear el proveedor:', err);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
