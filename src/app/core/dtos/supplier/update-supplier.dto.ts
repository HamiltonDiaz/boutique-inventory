import { PersonDto } from "../person.dto"

export interface UpdateSupplierDto {
  proveedor: SupplierDto
  persona: PersonDto
}

export interface SupplierDto {
  razon_social: string
  marca: boolean
}
