import { ArticleSalesDto } from "./article-sales-dto"

export interface CreateSalesDto {
  id_venta:  number
  id_cliente: string
  id_usuario: string
  fecha: string 
  articulosVenta: ArticleSalesDto[]
}
