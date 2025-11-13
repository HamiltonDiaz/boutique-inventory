import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { SalesRepositoryInterface } from './sales.repository.interface'
import { SalesModel } from '../../models/sales/sales.model'
import { CreateSalesDto } from '../../dtos/sales/create-sales.dto'
import { UpdateSalesDto } from '../../dtos/sales/update-sales.dto'

@Injectable({ providedIn: 'root' })
export class SalesRepository implements SalesRepositoryInterface {
  API_URL = `${environment.url}venta/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<SalesModel[]>> {
    return this._httpClient.get<ResponseModel<SalesModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: number): Observable<ResponseModel<SalesModel>> {
    return this._httpClient.get<ResponseModel<SalesModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateSalesDto
  ): Observable<ResponseModel<SalesModel>> {
    return this._httpClient.post<ResponseModel<SalesModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: number, data: UpdateSalesDto): Observable<ResponseModel<boolean>> {
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
