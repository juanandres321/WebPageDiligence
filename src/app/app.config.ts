import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]), // Configura tus rutas si las tienes
    provideHttpClient() // Agrega el HttpClient como un proveedor global
  ]
};
