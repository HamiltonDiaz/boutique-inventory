import { Observable } from "rxjs";
import { ResponseModel } from "../../models/common/response.model";
import { ProductModel } from "../../models/product/product.model";
import { CreateProductDto } from "../../dtos/product/create-product.dto";
import { UpdateProductDto } from "../../dtos/product/update-product.dto";


export interface ProductServiceInterface {
  findAll(): Observable<ResponseModel<ProductModel[]>>;
  findById(id: string): Observable<ResponseModel<ProductModel>>;
  create(data: CreateProductDto): Observable<ResponseModel<ProductModel>>;
  update(id: string, data: UpdateProductDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}