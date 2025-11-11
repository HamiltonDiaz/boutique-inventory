import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { CategoryServiceInterface } from './category.service.interface';
import { CategoryRepository } from '../../repos/category/category.repository';
import { CategoryModel } from '../../models/category/category.model';
import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../dtos/category/update-category.dto';

@Injectable({ providedIn: 'root' })
export class CategoryService implements CategoryServiceInterface {
  private repository = inject(CategoryRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<CategoryModel[]>> {
    return this.repository.findAll();
  }
  findById(id: string): Observable<ResponseModel<CategoryModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateCategoryDto): Observable<ResponseModel<CategoryModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: UpdateCategoryDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
