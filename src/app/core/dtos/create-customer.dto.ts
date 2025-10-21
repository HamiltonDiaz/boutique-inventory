import { PersonDto } from "./person.dto"

export interface CreateCustomerDto {
  direccion: string
  activo: boolean
  persona: PersonDto
}
