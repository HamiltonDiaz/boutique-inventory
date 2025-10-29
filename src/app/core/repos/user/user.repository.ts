import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { UserRepositoryInterface } from './user.repository.interface'
import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { UpdateUserDto } from '../../dtos/user/update-user.dto'
import { CreateUserDto } from '../../dtos/user/create-user.dto'
import { UsersModel } from '../../models/user/users.model'

@Injectable({ providedIn: 'root' })
export class UserRepository implements UserRepositoryInterface {
  API_URL = `${environment.url}usuario/`

  constructor(private _httpClient: HttpClient) {}
  
  findAll(    
  ): Observable<ResponseModel<UsersModel[]>> {
    return this._httpClient.get<ResponseModel<UsersModel[]>>(
      `${this.API_URL}`
    )
  }


  findById(id: string): Observable<ResponseModel<UsersModel>> {
    return this._httpClient.get<ResponseModel<UsersModel>>(
      `${this.API_URL}${id}`
    )
  }

  create(
    data: CreateUserDto
  ): Observable<ResponseModel<UsersModel>> {
    return this._httpClient.post<ResponseModel<UsersModel>>(
      `${this.API_URL}`,
      data
    )
  }


  update(id: string, data: UpdateUserDto): Observable<ResponseModel<boolean>> {
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
