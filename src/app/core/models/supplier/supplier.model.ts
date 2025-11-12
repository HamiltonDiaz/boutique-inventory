import { PersonModel } from "../person.model";

export class SupplierModel {
  constructor(
   	  public id_proveedor: number,
			public razon_social:string,
			public marca: string,
			public id_persona: number,
      public persona : PersonModel
  ) {
  }
}
