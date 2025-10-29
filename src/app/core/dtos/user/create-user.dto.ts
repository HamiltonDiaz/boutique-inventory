import { PersonDto } from "../person.dto"
import { UserDto } from "./user.dto"

export interface CreateUserDto {
    usuario: UserDto
    persona: PersonDto
}

