import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { LoginDto } from '../../dtos/auth/login.dto';
import { AuthModel } from '../../models/auth/auth.model';

export interface AuthRepositoryInterface {  
  login(loginDto: LoginDto): Observable<ResponseModel<AuthModel>>;
  logout(): boolean;
  isAuthenticated(): boolean
}
