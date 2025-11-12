import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { CountryRepositoryInterface } from './country.repository.interface'
import { environment } from '../../../../enviroments/enviroment.dev'

import { ResponseModel } from '../../models/common/response.model'
import { CountryModel } from '../../models/country/country.model'
import { CreateCountryDto } from '../../dtos/country/create-country.dto'
import { UpdateCountryDto } from '../../dtos/country/update-country.dto'


@Injectable({ providedIn: 'root' })
export class CountryRepository implements CountryRepositoryInterface {
  API_URL = `${environment.url}pais/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<CountryModel[]>> {
    return this._httpClient.get<ResponseModel<CountryModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: number): Observable<ResponseModel<CountryModel>> {
    return this._httpClient.get<ResponseModel<CountryModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateCountryDto
  ): Observable<ResponseModel<CountryModel>> {
    return this._httpClient.post<ResponseModel<CountryModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: number, data: UpdateCountryDto): Observable<ResponseModel<boolean>> {
    return this._httpClient.patch<ResponseModel<boolean>>(
      `${this.API_URL}${id}`,
      data
    )
  }

  delete(id: number): Observable<ResponseModel<boolean>> {
    return this._httpClient.delete<ResponseModel<boolean>>(
      `${this.API_URL}${id}`
    )
  }


}
