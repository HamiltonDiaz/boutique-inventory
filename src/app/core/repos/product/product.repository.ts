import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { ProductRepositoryInterface } from './product.repository.interface'
import { ProductModel } from '../../models/product/product.model'
import { CreateProductDto } from '../../dtos/product/create-product.dto'
import { UpdateProductDto } from '../../dtos/product/update-product.dto'


@Injectable({ providedIn: 'root' })
export class ProductRepository implements ProductRepositoryInterface {
  API_URL = `${environment.url}producto/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<ProductModel[]>> {
    return this._httpClient.get<ResponseModel<ProductModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: number): Observable<ResponseModel<ProductModel>> {
    return this._httpClient.get<ResponseModel<ProductModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateProductDto
  ): Observable<ResponseModel<ProductModel>> {
    return this._httpClient.post<ResponseModel<ProductModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: number, data: UpdateProductDto): Observable<ResponseModel<boolean>> {
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
