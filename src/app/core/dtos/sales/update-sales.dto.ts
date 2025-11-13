import { ArticleSalesDto } from "./article-sales-dto"

export interface UpdateSalesDto {
  id_venta:  number
  id_cliente: string,
  id_usuario: string,
  fecha: string 
  articulosVenta: ArticleSalesDto[]
}
