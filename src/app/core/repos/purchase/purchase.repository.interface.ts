import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { PurchaseModel } from '../../models/purchase/purchase.model';
import { UpdatePurchaseDto } from '../../dtos/purchase/update-purchase.dto';
import { CreatePurchaseDto } from '../../dtos/purchase/create-purchase.dto';



export interface PurchaseRepositoryInterface {
  findAll(): Observable<ResponseModel<PurchaseModel[]>>;
  findById(id: number): Observable<ResponseModel<PurchaseModel>>;
  create(data: CreatePurchaseDto): Observable<ResponseModel<PurchaseModel>>;
  update(id: number, data: UpdatePurchaseDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}
