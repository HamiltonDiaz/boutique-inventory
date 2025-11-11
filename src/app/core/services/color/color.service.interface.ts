import { Observable } from "rxjs";
import { ResponseModel } from "../../models/common/response.model";
import { ColorModel } from "../../models/color/color.model";
import { CreateColorDto } from "../../dtos/color/create-color.dto";
import { UpdateColorDto } from "../../dtos/color/update-color.dto";

export interface ColorServiceInterface {
  findAll(): Observable<ResponseModel<ColorModel[]>>;
  findById(id: string): Observable<ResponseModel<ColorModel>>;
  create(data: CreateColorDto): Observable<ResponseModel<ColorModel>>;
  update(id: string, data: UpdateColorDto): Observable<ResponseModel<boolean>>;
  delete(id: string): Observable<ResponseModel<boolean>>;
}