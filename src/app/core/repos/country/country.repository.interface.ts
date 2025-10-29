import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';

// import { CreateCustomerDto } from '../../dtos/create-customer.dto';
// import { UpdateCustomerDto } from '../../dtos/update-customer.dto';
import { CountryModel } from '../../models/country/country.model';

export interface CountryRepositoryInterface {
  findAll(): Observable<ResponseModel<CountryModel[]>>;
  // findById(id: string): Observable<ResponseModel<CountryModel>>;
  // create(data: CreateCustomerDto): Observable<ResponseModel<CountryModel>>;
  // update(id: string, data: UpdateCustomerDto): Observable<ResponseModel<boolean>>;
  // delete(id: string): Observable<ResponseModel<boolean>>;
}
