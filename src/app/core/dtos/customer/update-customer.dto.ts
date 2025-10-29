import { PersonDto } from "../person.dto"

export interface UpdateCustomerDto {
  cliente: ClientDto
  persona: PersonDto
}

export interface ClientDto {  
  direccion: string
  activo: boolean
}
