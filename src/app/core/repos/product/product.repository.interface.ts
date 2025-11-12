import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { ProductModel } from '../../models/product/product.model';
import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { UpdateProductDto } from '../../dtos/product/update-product.dto';


export interface ProductRepositoryInterface {
  findAll(): Observable<ResponseModel<ProductModel[]>>;
  findById(id: number): Observable<ResponseModel<ProductModel>>;
  create(data: CreateProductDto): Observable<ResponseModel<ProductModel>>;
  update(id: number, data: UpdateProductDto): Observable<ResponseModel<boolean>>;
  delete(id: number): Observable<ResponseModel<boolean>>;
}
