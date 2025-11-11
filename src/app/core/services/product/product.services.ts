import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { ProductServiceInterface } from './product.service.interface';
import { ProductRepository } from '../../repos/product/product.repository';
import { ProductModel } from '../../models/product/product.model';
import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { UpdateProductDto } from '../../dtos/product/update-product.dto';

@Injectable({ providedIn: 'root' })
export class ProductService implements ProductServiceInterface {
  private repository = inject(ProductRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<ProductModel[]>> {
    return this.repository.findAll();
  }
  findById(id: string): Observable<ResponseModel<ProductModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateProductDto): Observable<ResponseModel<ProductModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: UpdateProductDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
