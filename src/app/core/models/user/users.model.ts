import { PersonModel } from '../person.model';


export class UsersModel {
  id_usuario: string;
  username:string
  password:string
  avatar: string;  
  activo: boolean;
  id_persona: number;
  fecha_actualizacion: string;
  fecha_creacion: string;

  persona: PersonModel;

  constructor(
    id_usuario: string,
    username:string,
    password:string,
    activo: boolean,
    id_persona: number,
    fecha_actualizacion: string,
    fecha_creacion: string,
    persona: PersonModel,
    avatar: string
  ) {    
    this.activo = activo;
    this.id_persona = id_persona;
    this.fecha_actualizacion = fecha_actualizacion;
    this.fecha_creacion = fecha_creacion;
    this.persona = persona;
    this.avatar = avatar;
    this.id_usuario = id_usuario
    this.username = username
    this.password = password
  }
}
