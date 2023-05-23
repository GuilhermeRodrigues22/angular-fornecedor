import { Component, OnInit } from '@angular/core';
import { Supllier } from '../supplier';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
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
  submitted: boolean = false;
  categoryOptions: string[] = ['Roupas', 'Colecionavel', 'Jogos', 'Instrumento', 'Eletronico'];

  constructor(
    private SupplierService: SupplierService,
    private FormBuilder: FormBuilder
  ){
    this.FormGroupSupplier = FormBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      produto: ['', [Validators.required]],
      isAcceptedTerms: [false, [Validators.required, this.validateIsAcceptedTerms]]
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

  validateIsAcceptedTerms(control: AbstractControl) {
    if (!control.value) {
      return {isAcceptedTermsRequired: true};
    }
    return null;
  }

  save() {
    this.submitted = true;
    if (this.FormGroupSupplier.valid) {
    if (this.isEditing) {
      this.SupplierService.update(this.FormGroupSupplier.value).subscribe({
        next: () => {
          this.loadSuppliers();
          this.FormGroupSupplier.reset();
          this.isEditing = false;
          this.submitted = false;
        },
      });
    } else {
      this.SupplierService.save(this.FormGroupSupplier.value).subscribe({
        next: (data) => {
          this.suppliers.push(data);
          this.FormGroupSupplier.reset();
          this.submitted = false;
        },
      });
    }
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

  get name(): any {
    return this.FormGroupSupplier.get('name');
  }
  get email(): any {
    return this.FormGroupSupplier.get('email');
  }
  get telefone(): any {
    return this.FormGroupSupplier.get('telefone');
  }
  get cnpj(): any {
    return this.FormGroupSupplier.get('cnpj');
  }
  get produto(): any {
    return this.FormGroupSupplier.get('produto');
  }
  get accTerms(): any {
    return this.FormGroupSupplier.get('isAcceptedTerms');
  }
}
