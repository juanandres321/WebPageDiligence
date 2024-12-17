import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../interfaces/supplier';

@Injectable({
  providedIn: 'root'  
})
export class SupplierService {
  private AppUrl = 'https://localhost:7210/';
  private ApiUrl = 'api/Supplier/';
  private ApiUrl2 = 'api/Scrapper/';

  constructor(private http: HttpClient) {}

  getAllSupplier(): Observable<any> {
    return this.http.get<any>(`${this.AppUrl + this.ApiUrl+'GetAll'}`);
  }

  getSupplierById(id: number): Observable<any> {
    return this.http.get(`${this.AppUrl + this.ApiUrl + id}`);
  }

  createSupplier(empresa: Supplier): Observable<any> {
    return this.http.post(`${this.AppUrl + this.ApiUrl}`, empresa);
  }

  updateSupplier(empresa: Supplier): Observable<any> {
    return this.http.put(`${this.AppUrl + this.ApiUrl}`, empresa);
  }

  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(this.AppUrl + this.ApiUrl + id);
  }

  getAllScrapper(company: string): Observable<any> {
    return this.http.get(`${this.AppUrl + this.ApiUrl2 + 'buscar/' + company}`);
  }
}
