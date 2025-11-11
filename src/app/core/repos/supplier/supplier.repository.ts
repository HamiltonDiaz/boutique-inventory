import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { SupplierRepositoryInterface } from './supplier.repository.interface'
import { SupplierModel } from '../../models/supplier/supplier.model'
import { CreateSupplierDto } from '../../dtos/supplier/create-supplier.dto'
import { UpdateSupplierDto } from '../../dtos/supplier/update-supplier.dto'



@Injectable({ providedIn: 'root' })
export class SupplierRepository implements SupplierRepositoryInterface {
  API_URL = `${environment.url}Supplier/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<SupplierModel[]>> {
    return this._httpClient.get<ResponseModel<SupplierModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: string): Observable<ResponseModel<SupplierModel>> {
    return this._httpClient.get<ResponseModel<SupplierModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateSupplierDto
  ): Observable<ResponseModel<SupplierModel>> {
    return this._httpClient.post<ResponseModel<SupplierModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: string, data: UpdateSupplierDto): Observable<ResponseModel<boolean>> {
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
