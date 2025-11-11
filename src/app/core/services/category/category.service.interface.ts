import { Observable } from "rxjs";
import { ResponseModel } from "../../models/common/response.model";
import { CategoryModel } from "../../models/category/category.model";
import { UpdateCategoryDto } from "../../dtos/category/update-category.dto";
import { CreateCategoryDto } from "../../dtos/category/create-category.dto";

export interface CategoryServiceInterface {
  findAll(): Observable<ResponseModel<CategoryModel[]>>;
  findById(id: string): Observable<ResponseModel<CategoryModel>>;
  create(data: CreateCategoryDto): Observable<ResponseModel<CategoryModel>>;
  update(id: string, data: UpdateCategoryDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}