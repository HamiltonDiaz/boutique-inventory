export class ProductPurchaseModel {
  constructor(
    public id_producto: number,
    public id_talla: number,
    public id_color: number,
    public precio: number,
    public foto: string,
    public cantidad: number,
    public activo: boolean
  ) {}
}
