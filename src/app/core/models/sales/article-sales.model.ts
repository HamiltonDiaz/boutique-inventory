import { ProductSalesModel } from './product-sales.model';

export class ArticleSalesModel {
  constructor(
    public id_axv: number,
    public id_pxc: number,
    public cantidad_vendida: number,
    public precio_unitario: number,
    public id_venta: number,
    public productoVenta: ProductSalesModel
  ) {}
}
