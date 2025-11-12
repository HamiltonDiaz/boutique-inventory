import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { CountryModel } from '../../models/country/country.model';
import { CreateCountryDto } from '../../dtos/country/create-country.dto';
import { UpdateCountryDto } from '../../dtos/country/update-country.dto';


export interface CountryRepositoryInterface {
  findAll(): Observable<ResponseModel<CountryModel[]>>;
  findById(id: number): Observable<ResponseModel<CountryModel>>;
  create(data: CreateCountryDto): Observable<ResponseModel<CountryModel>>;
  update(id: number, data: UpdateCountryDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}
