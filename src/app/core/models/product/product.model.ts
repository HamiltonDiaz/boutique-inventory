import { CategoryModel } from '../category/category.model';

export class ProductModel {
  constructor(
    public id_producto: number,
    public nombre: string,
    public descripcion: string,
    public instrucciones_de_cuidado: string,
    public cantidad_stock: number,
    public id_categoria: number,
    public categoria: CategoryModel
  ) {}
}
