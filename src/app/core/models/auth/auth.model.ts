import { PersonModel } from '../person.model';

interface user{
  id_usuario: string;
  username:string
  password:string
  avatar: string;  
  activo: boolean;
  id_persona: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
  persona: PersonModel;
}
export class AuthModel {
  constructor(
    public usuario: user,
    public token: string 
  ) {}
}