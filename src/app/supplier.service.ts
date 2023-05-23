import { SupplierComponent } from './supplier/supplier.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supllier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url = "http://localhost:3000/suppliers"
  constructor(private http: HttpClient) { }

  getClients(): Observable<Supllier[]> {
    return this.http.get<Supllier[]>(this.url);
  }

  save(supplier: Supllier): Observable<Supllier> {
    return this.http.post<Supllier>(this.url, supplier);
  }

  update(supplier: Supllier): Observable<Supllier> {
    return this.http.put<Supllier>(`${this.url}/${supplier.id}`, supplier);
  }

  delete(supplier: Supllier): Observable<void> {
    return this.http.delete<void>(`${this.url}/${supplier.id}`);
  }
}
