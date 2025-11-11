import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SupplierModel } from '../../models/supplier/supplier.model';
import { CreateSupplierDto } from '../../dtos/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../../dtos/supplier/update-supplier.dto';
export interface SupplierRepositoryInterface {
  findAll(): Observable<ResponseModel<SupplierModel[]>>;
  findById(id: string): Observable<ResponseModel<SupplierModel>>;
  create(data: CreateSupplierDto): Observable<ResponseModel<SupplierModel>>;
  update(id: string, data: UpdateSupplierDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}
