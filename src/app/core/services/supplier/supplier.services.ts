import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SupplierServiceInterface } from './supplier.service.interface';
import { SupplierRepository } from '../../repos/supplier/supplier.repository';
import { SupplierModel } from '../../models/supplier/supplier.model';
import { CreateSupplierDto } from '../../dtos/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../../dtos/supplier/update-supplier.dto';



@Injectable({ providedIn: 'root' })
export class SupplierService implements SupplierServiceInterface {
  private repository = inject(SupplierRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<SupplierModel[]>> {
    return this.repository.findAll();
  }
  findById(id: number): Observable<ResponseModel<SupplierModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateSupplierDto): Observable<ResponseModel<SupplierModel>> {
    return this.repository.create(data);
  }

  update(id: number,data: UpdateSupplierDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: number): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
