import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { FullProductModel } from '../../models/product/full-product.model';
import { CreateFullProductDto } from '../../dtos/product/create-full-product.dto';
import { UpdateFullProductDto } from '../../dtos/product/update-full-product.dto';


export interface FullProductRepositoryInterface {
  findAll(): Observable<ResponseModel<FullProductModel[]>>;
  findById(id: number): Observable<ResponseModel<FullProductModel>>;
  create(data: FormData | CreateFullProductDto): Observable<ResponseModel<FullProductModel>>;
  update(id: number, data: FormData |  UpdateFullProductDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}
