import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponseModel } from '../../models/common/response.model';
import { UserServiceInterface } from './user.service.interface';
import { UserRepository } from '../../repos/user/user.repository';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UsersModel } from '../../models/user/users.model';


@Injectable({ providedIn: 'root' })
export class UserService implements UserServiceInterface {
  private repository = inject(UserRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<UsersModel[]>> {
    return this.repository.findAll();
  }

  findById(id: string): Observable<ResponseModel<UsersModel>> {
    return this.repository.findById(id);
  }

  create(data: FormData | CreateUserDto): Observable<ResponseModel<UsersModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: FormData | UpdateUserDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
