import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SalesModel } from '../../models/sales/sales.model';
import { CreateSalesDto } from '../../dtos/sales/create-sales.dto';
import { UpdateSalesDto } from '../../dtos/sales/update-sales.dto';

export interface SalesRepositoryInterface {
  findAll(): Observable<ResponseModel<SalesModel[]>>;
  findById(id: number): Observable<ResponseModel<SalesModel>>;
  create(data: CreateSalesDto): Observable<ResponseModel<SalesModel>>;
  update(id: number, data: UpdateSalesDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}
