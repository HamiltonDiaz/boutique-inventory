import { Observable } from "rxjs";

import { ResponseModel } from "../../models/common/response.model";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { UsersModel } from "../../models/user/users.model";
import { UpdateUserDto } from "../../dtos/user/update-user.dto";

export interface UserServiceInterface {
  findAll(): Observable<ResponseModel<UsersModel[]>>;  
  findById(id: string): Observable<ResponseModel<UsersModel>>;
  create(data: CreateUserDto): Observable<ResponseModel<UsersModel>>;
  update(id: string, data: UpdateUserDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}