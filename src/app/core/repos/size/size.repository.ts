import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { SizeRepositoryInterface } from './size.repository.interface'
import { SizeModel } from '../../models/size/size.model'
import { CreateSizeDto } from '../../dtos/size/create-size.dto'
import { UpdateSizeDto } from '../../dtos/size/update-size.dto'


@Injectable({ providedIn: 'root' })
export class SizeRepository implements SizeRepositoryInterface {
  API_URL = `${environment.url}talla/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<SizeModel[]>> {
    return this._httpClient.get<ResponseModel<SizeModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: number): Observable<ResponseModel<SizeModel>> {
    return this._httpClient.get<ResponseModel<SizeModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateSizeDto
  ): Observable<ResponseModel<SizeModel>> {
    return this._httpClient.post<ResponseModel<SizeModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: number, data: UpdateSizeDto): Observable<ResponseModel<boolean>> {
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
