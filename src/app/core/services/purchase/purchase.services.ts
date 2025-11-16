import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { PurchaseServiceInterface } from './purchase.service.interface';
import { PurchaseRepository } from '../../repos/purchase/purchase.repository';
import { PurchaseModel } from '../../models/purchase/purchase.model';
import { CreatePurchaseDto } from '../../dtos/purchase/create-purchase.dto';
import { UpdatePurchaseDto } from '../../dtos/purchase/update-purchase.dto';

@Injectable({ providedIn: 'root' })
export class PurchaseService implements PurchaseServiceInterface {
  private repository = inject(PurchaseRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<PurchaseModel[]>> {
    return this.repository.findAll();
  }
  findById(id: number): Observable<ResponseModel<PurchaseModel>> {
    return this.repository.findById(id);
  }

  create(data: CreatePurchaseDto): Observable<ResponseModel<PurchaseModel>> {
    return this.repository.create(data);
  }

  update(id: number,data: UpdatePurchaseDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: number): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
