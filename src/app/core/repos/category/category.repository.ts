import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { CategoryRepositoryInterface } from './category.repository.interface'
import { UpdateCategoryDto } from '../../dtos/category/update-category.dto'
import { CategoryModel } from '../../models/category/category.model'
import { CreateCategoryDto } from '../../dtos/category/create-category.dto'

@Injectable({ providedIn: 'root' })
export class CategoryRepository implements CategoryRepositoryInterface {
  API_URL = `${environment.url}categoria/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<CategoryModel[]>> {
    return this._httpClient.get<ResponseModel<CategoryModel[]>>(
      `${this.API_URL}`
    )
  }

  findById(id: string): Observable<ResponseModel<CategoryModel>> {
    return this._httpClient.get<ResponseModel<CategoryModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateCategoryDto
  ): Observable<ResponseModel<CategoryModel>> {
    return this._httpClient.post<ResponseModel<CategoryModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: string, data: UpdateCategoryDto): Observable<ResponseModel<boolean>> {
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
