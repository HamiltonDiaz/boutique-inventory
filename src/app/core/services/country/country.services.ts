import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { CountryServiceInterface } from './country.service.interface';
import { CountryModel } from '../../models/country/country.model';
import { CountryRepository } from '../../repos/country/country.repository';
import { CreateCountryDto } from '../../dtos/country/create-country.dto';
import { UpdateCountryDto } from '../../dtos/country/update-country.dto';


@Injectable({ providedIn: 'root' })
export class CountryService implements CountryServiceInterface {
  private repository = inject(CountryRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<CountryModel[]>> {
    return this.repository.findAll();
  }
  findById(id: number): Observable<ResponseModel<CountryModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateCountryDto): Observable<ResponseModel<CountryModel>> {
    return this.repository.create(data);
  }

  update(id: number,data: UpdateCountryDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: number): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
