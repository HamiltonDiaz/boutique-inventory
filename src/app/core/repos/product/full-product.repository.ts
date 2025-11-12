import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { FullProductRepositoryInterface } from './full-product.repository.interface'
import { FullProductModel } from '../../models/product/full-product.model'
import { CreateFullProductDto } from '../../dtos/product/create-full-product.dto'
import { UpdateFullProductDto } from '../../dtos/product/update-full-product.dto'



@Injectable({ providedIn: 'root' })
export class FullProductRepository implements FullProductRepositoryInterface {
  API_URL = `${environment.url}productocompleto/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<FullProductModel[]>> {
    return this._httpClient.get<ResponseModel<FullProductModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: number): Observable<ResponseModel<FullProductModel>> {
    return this._httpClient.get<ResponseModel<FullProductModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: FormData | CreateFullProductDto 
  ): Observable<ResponseModel<FullProductModel>> {
    return this._httpClient.post<ResponseModel<FullProductModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: number, data: FormData |  UpdateFullProductDto): Observable<ResponseModel<boolean>> {
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
