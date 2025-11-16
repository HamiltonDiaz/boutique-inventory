import { ArticlePurchaseDto } from "./article-purchase-dto"

export interface UpdatePurchaseDto {
  id_compra_inventario: number
  id_proveedor: number
  id_usuario: string
  fecha: string
  articulosCompra: ArticlePurchaseDto[]
}
