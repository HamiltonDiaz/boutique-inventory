import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { UsersModel } from '../../models/user/users.model';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { CreateUserDto } from '../../dtos/user/create-user.dto';


export interface UserRepositoryInterface {
  findAll(): Observable<ResponseModel<UsersModel[]>>;  
  findById(id: string): Observable<ResponseModel<UsersModel>>;
  create(data: FormData | CreateUserDto): Observable<ResponseModel<UsersModel>>;
  update(id: string, data: FormData |  UpdateUserDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}
