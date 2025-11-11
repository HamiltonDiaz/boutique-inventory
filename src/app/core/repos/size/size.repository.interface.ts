import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SizeModel } from '../../models/size/size.model';
import { CreateSizeDto } from '../../dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../dtos/size/update-size.dto';


export interface SizeRepositoryInterface {
  findAll(): Observable<ResponseModel<SizeModel[]>>;
  findById(id: string): Observable<ResponseModel<SizeModel>>;
  create(data: CreateSizeDto): Observable<ResponseModel<SizeModel>>;
  update(id: string, data: UpdateSizeDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}
