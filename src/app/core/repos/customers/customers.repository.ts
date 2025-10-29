import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { CustomersRepositoryInterface } from './customers.repository.interface'
import { environment } from '../../../../enviroments/enviroment.dev'
import { CustomersModel } from '../../models/customers/customers.model'
import { ResponseModel } from '../../models/common/response.model'
import { CreateCustomerDto } from '../../dtos/create-customer.dto'
import { UpdateCustomerDto } from '../../dtos/update-customer.dto'

@Injectable({ providedIn: 'root' })
export class CustomersRepository implements CustomersRepositoryInterface {
  API_URL = `${environment.url}cliente/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<CustomersModel[]>> {
    return this._httpClient.get<ResponseModel<CustomersModel[]>>(
      `${this.API_URL}`
    )
  }

  // findAll(    
  // ): Observable<CustomersModel[]> {
  //   return this._httpClient.get<CustomersModel[]>(
  //     `${this.API_URL}`
  //   )
  // }

  findById(id: string): Observable<ResponseModel<CustomersModel>> {
    return this._httpClient.get<ResponseModel<CustomersModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateCustomerDto
  ): Observable<ResponseModel<CustomersModel>> {
    return this._httpClient.post<ResponseModel<CustomersModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: string, data: UpdateCustomerDto): Observable<ResponseModel<boolean>> {
    return this._httpClient.patch<ResponseModel<boolean>>(
      `${this.API_URL}${id}`,
      data
    )
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this._httpClient.delete<ResponseModel<boolean>>(
      `${this.API_URL}${id}`
    )
  }


}
