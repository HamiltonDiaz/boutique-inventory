import { PersonDto } from "../person.dto"

export interface CreateCustomerDto {
  cliente: CategoryDto
  persona: PersonDto
}

export interface CategoryDto {
  direccion: string
  activo: boolean
}
