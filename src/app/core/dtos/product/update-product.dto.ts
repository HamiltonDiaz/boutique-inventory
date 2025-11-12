export interface UpdateProductDto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  instrucciones_de_cuidado: string;
  cantidad_stock: number;
  id_categoria: number;
}
