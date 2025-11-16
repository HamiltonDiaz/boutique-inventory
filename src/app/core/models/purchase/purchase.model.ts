import { ArticlePurchaseModel } from "./article-purchase.model";

export class PurchaseModel {
  constructor(
      public id_compra_inventario: number,
			public id_proveedor: number,
			public id_usuario: string,
			public valor_total: number,
			public fecha: string,
      public articulosCompra: ArticlePurchaseModel[],
  ) {
  }
}
