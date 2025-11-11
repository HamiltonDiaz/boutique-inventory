import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { PurchaseRepositoryInterface } from './purchase.repository.interface'
import { PurchaseModel } from '../../models/purchase/purchase.model'
import { CreatePurchaseDto } from '../../dtos/purchase/create-purchase.dto'
import { UpdatePurchaseDto } from '../../dtos/purchase/update-purchase.dto'



@Injectable({ providedIn: 'root' })
export class PurchaseRepository implements PurchaseRepositoryInterface {
  API_URL = `${environment.url}Purchase/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<PurchaseModel[]>> {
    return this._httpClient.get<ResponseModel<PurchaseModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: string): Observable<ResponseModel<PurchaseModel>> {
    return this._httpClient.get<ResponseModel<PurchaseModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreatePurchaseDto
  ): Observable<ResponseModel<PurchaseModel>> {
    return this._httpClient.post<ResponseModel<PurchaseModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: string, data: UpdatePurchaseDto): Observable<ResponseModel<boolean>> {
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
