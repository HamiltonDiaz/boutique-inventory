import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/common/response.model';
import { ColorModel } from '../../models/color/color.model';
import { UpdateColorDto } from '../../dtos/color/update-color.dto';
import { CreateColorDto } from '../../dtos/color/create-color.dto';
import { ColorServiceInterface } from './color.service.interface';
import { ColorRepository } from '../../repos/color/color.repository';


@Injectable({ providedIn: 'root' })
export class ColorService implements ColorServiceInterface {
  private repository = inject(ColorRepository);

  constructor() {}

  findAll(): Observable<ResponseModel<ColorModel[]>> {
    return this.repository.findAll();
  }
  findById(id: string): Observable<ResponseModel<ColorModel>> {
    return this.repository.findById(id);
  }

  create(data: CreateColorDto): Observable<ResponseModel<ColorModel>> {
    return this.repository.create(data);
  }

  update(id: string,data: UpdateColorDto): Observable<ResponseModel<boolean>> {
    return this.repository.update(id, data);
  }

  delete(id: string): Observable<ResponseModel<boolean>> {
    return this.repository.delete(id);
  }
}
