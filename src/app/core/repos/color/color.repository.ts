import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { ColorRepositoryInterface } from './color.repository.interface'
import { ColorModel } from '../../models/color/color.model'
import { CreateColorDto } from '../../dtos/color/create-color.dto'
import { UpdateColorDto } from '../../dtos/color/update-color.dto'


@Injectable({ providedIn: 'root' })
export class ColorRepository implements ColorRepositoryInterface {
  API_URL = `${environment.url}color/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<ColorModel[]>> {
    return this._httpClient.get<ResponseModel<ColorModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: string): Observable<ResponseModel<ColorModel>> {
    return this._httpClient.get<ResponseModel<ColorModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateColorDto
  ): Observable<ResponseModel<ColorModel>> {
    return this._httpClient.post<ResponseModel<ColorModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: string, data: UpdateColorDto): Observable<ResponseModel<boolean>> {
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
