import { PersonDto } from "../person.dto"

export interface CreateCustomerDto {
  cliente: ClientDto
  persona: PersonDto
}

export interface ClientDto {
  direccion: string
  activo: boolean
}
