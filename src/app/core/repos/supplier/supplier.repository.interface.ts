import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SupplierModel } from '../../models/supplier/supplier.model';
import { CreateSupplierDto } from '../../dtos/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../../dtos/supplier/update-supplier.dto';
export interface SupplierRepositoryInterface {
  findAll(): Observable<ResponseModel<SupplierModel[]>>;
  findById(id: number): Observable<ResponseModel<SupplierModel>>;
  create(data: CreateSupplierDto): Observable<ResponseModel<SupplierModel>>;
  update(id: number, data: UpdateSupplierDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}
