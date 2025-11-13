import { CustomersModel } from "../customers/customers.model";
import { PersonModel } from "../person.model";
import { ArticleSalesModel } from "./article-sales.model";

export class SalesModel {
  constructor(
    public id_venta: number,
    public id_cliente: string,
    public id_categoria: string,
    public valor_total: number,
    public fecha: string,
    public articulosVenta: ArticleSalesModel[],
    public cliente: {
      cliente: CustomersModel,
      persona: PersonModel
    }
  ) {
  }
}
