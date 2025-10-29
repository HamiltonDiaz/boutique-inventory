import { PersonDto } from "../person.dto"
import { UserDto } from "./user.dto"

export interface UpdateUserDto {
    usuario: UserDto
    persona: PersonDto
}