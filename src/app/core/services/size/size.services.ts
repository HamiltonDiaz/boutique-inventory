import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { SizeServiceInterface } from './size.service.interface';
import { SizeRepository } from '../../repos/size/size.repository';
import { SizeModel } from '../../models/size/size.model';
import { CreateSizeDto } from '../../dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../dtos/size/update-size.dto';



@Injectable({ providedIn: 'root' })
export class SizeService implements SizeServiceInterface {
  private repository = inject(SizeRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<SizeModel[]>> {
    return this.repository.findAll();
  }
  findById(id: string): Observable<ResponseModel<SizeModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateSizeDto): Observable<ResponseModel<SizeModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: UpdateSizeDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
