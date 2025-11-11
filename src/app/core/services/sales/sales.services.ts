import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SalesServiceInterface } from './sales.service.interface';
import { SalesRepository } from '../../repos/sales/sales.repository';
import { SalesModel } from '../../models/sales/sales.model';
import { CreateSalesDto } from '../../dtos/sales/create-sales.dto';
import { UpdateSalesDto } from '../../dtos/sales/update-sales.dto';



@Injectable({ providedIn: 'root' })
export class SalesService implements SalesServiceInterface {
  private repository = inject(SalesRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<SalesModel[]>> {
    return this.repository.findAll();
  }
  findById(id: string): Observable<ResponseModel<SalesModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateSalesDto): Observable<ResponseModel<SalesModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: UpdateSalesDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
