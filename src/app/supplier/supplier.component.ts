import { Component, OnInit } from '@angular/core';
import { Supllier } from '../supplier';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SupplierService} from '../supplier.service'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  suppliers: Supllier [] = [];
  isEditing: boolean = false;
  FormGroupSupplier: FormGroup;

  constructor(
    private SupplierService: SupplierService,
    private FormBuilder: FormBuilder
  ){
    this.FormGroupSupplier = FormBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      telefone: [''],
      cnpj: [''],
      produto: ['']
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.SupplierService.getClients().subscribe({
      next: (data) => (this.suppliers = data),
    });
  }

  save() {
    if (this.isEditing) {
      this.SupplierService.update(this.FormGroupSupplier.value).subscribe({
        next: () => {
          this.loadSuppliers();
          this.FormGroupSupplier.reset();
          this.isEditing = false;
        },
      });
    } else {
      this.SupplierService.save(this.FormGroupSupplier.value).subscribe({
        next: (data) => {
          this.suppliers.push(data);
          this.FormGroupSupplier.reset();
        },
      });
    }
  }

  edit(supplier: Supllier) {
    this.FormGroupSupplier.setValue(supplier);
    this.isEditing = true;
  }

  delete(supplier: Supllier) {
    this.SupplierService.delete(supplier).subscribe({
      next: () => this.loadSuppliers(),
    });
  }

  FormReset(){
    this.FormGroupSupplier.reset();
  }

}
