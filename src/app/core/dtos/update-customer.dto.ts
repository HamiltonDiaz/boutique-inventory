import { PersonDto } from "./person.dto"

export interface UpdateCustomerDto {
  direccion: string
  activo: boolean
  persona: PersonDto
}
