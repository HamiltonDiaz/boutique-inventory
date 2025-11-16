import { ProductPurchaseModel } from "./product-purchase.model";


export class ArticlePurchaseModel {
  constructor(
    public id_axv: number,
    public id_pxc: number,
    public cantidad: number,
    public precio_unitario: number,
    public id_compra_inventario: number,
    public productoVenta: ProductPurchaseModel
  ) {}
}
