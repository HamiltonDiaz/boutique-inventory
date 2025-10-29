import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersModel } from '../../models/customers/customers.model';
import { CustomersRepository } from '../../repos/customers/customers.repository';
import { ResponseModel } from '../../models/common/response.model';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { CustomersServiceInterface } from './customers.service.interface';

@Injectable({ providedIn: 'root' })
export class CustomersService implements CustomersServiceInterface {
  private repository = inject(CustomersRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<CustomersModel[]>> {
    return this.repository.findAll();
  }
  // findAll(): Observable<CustomersModel[]> {
  //   return this.repository.findAll();
  // }

  findById(id: string): Observable<ResponseModel<CustomersModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateCustomerDto): Observable<ResponseModel<CustomersModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: UpdateCustomerDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
