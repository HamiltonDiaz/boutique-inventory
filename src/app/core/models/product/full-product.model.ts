import { ColorModel } from '../color/color.model';
import { SizeModel } from '../size/size.model';
import { ProductModel } from './product.model';

export class FullProductModel {
  constructor(
    public id_pxc: number,
    public id_producto: number,
    public id_talla:number,
    public id_color:number,
    public precio: string,
    public foto: string,
    public cantidad: string,
    public activo: boolean,
    public producto: ProductModel,
    public talla: SizeModel,
    public color: ColorModel
  ) {}
}