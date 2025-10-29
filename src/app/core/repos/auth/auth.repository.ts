import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'


import { environment } from '../../../../enviroments/enviroment.dev'
import { ResponseModel } from '../../models/common/response.model'
import { LoginDto } from '../../dtos/auth/login.dto'
import { AuthRepositoryInterface } from './auth.repository.interface'
import { AuthModel } from '../../models/auth/auth.model'

@Injectable({ providedIn: 'root' })
export class AuthRepository implements AuthRepositoryInterface {
  API_URL = `${environment.url}login`

  constructor(private _httpClient: HttpClient) {}

  login(
    loginDto: LoginDto
  ): Observable<ResponseModel<AuthModel>> {
    return this._httpClient.post<ResponseModel<AuthModel>>(
      `${this.API_URL}`,
      loginDto
    )
  }

 isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true
    }
    return false
  }

  logout(): boolean {    
    return this.isAuthenticated()
  }



}
