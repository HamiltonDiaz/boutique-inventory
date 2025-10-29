import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


import { ResponseModel } from '../../models/common/response.model';
// import { CreateCustomerDto } from '../../dtos/create-customer.dto';
// import { UpdateCustomerDto } from '../../dtos/update-customer.dto';
import { CountryServiceInterface } from './country.service.interface';
import { CountryModel } from '../../models/country/country.model';
import { CountryRepository } from '../../repos/country/country.repository';

@Injectable({ providedIn: 'root' })
export class CountryService implements CountryServiceInterface {
  private repository = inject(CountryRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<CountryModel[]>> {
    return this.repository.findAll();
  }
  // findById(id: string): Observable<ResponseModel<CountryModel>> {
  //   return this.repository.findById(id);
  // }

  // create(data: CreateCustomerDto): Observable<ResponseModel<CountryModel>> {
  //   return this.repository.create(data);
  // }

  // update(id: string,data: UpdateCustomerDto): Observable<ResponseModel<boolean>> {
  //   return this.repository.update(id, data);
  // }

  // delete(id: string): Observable<ResponseModel<boolean>> {
  //   return this.repository.delete(id);
  // }
}
