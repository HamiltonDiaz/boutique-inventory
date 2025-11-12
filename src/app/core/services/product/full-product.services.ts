import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { FullProductServiceInterface } from './full-product.service.interface';
import { FullProductRepository } from '../../repos/product/full-product.repository';
import { FullProductModel } from '../../models/product/full-product.model';
import { CreateFullProductDto } from '../../dtos/product/create-full-product.dto';
import { UpdateFullProductDto } from '../../dtos/product/update-full-product.dto';


@Injectable({ providedIn: 'root' })
export class FullProductService implements FullProductServiceInterface {
  private repository = inject(FullProductRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<FullProductModel[]>> {
    return this.repository.findAll();
  }
  findById(id: number): Observable<ResponseModel<FullProductModel>> {
    return this.repository.findById(id);
  }

  create(data: FormData | CreateFullProductDto): Observable<ResponseModel<FullProductModel>> {
    return this.repository.create(data);
  }

  update(id: number,data: FormData | UpdateFullProductDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: number): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
