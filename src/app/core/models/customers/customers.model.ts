import { PersonModel } from '../person.model';


export class CustomersModel {
  id_cliente: string;
  direccion: string;
  activo: boolean;
  id_persona: number;
  fecha_actualizacion: string;
  fecha_creacion: string;

  persona: PersonModel;

  constructor(
    id_cliente: string,
    direccion: string,
    activo: boolean,
    id_persona: number,
    fecha_actualizacion: string,
    fecha_creacion: string,
    persona: PersonModel
  ) {
    this.id_cliente = id_cliente;
    this.direccion = direccion;
    this.activo = activo;
    this.id_persona = id_persona;
    this.fecha_actualizacion = fecha_actualizacion;
    this.fecha_creacion = fecha_creacion;
    this.persona = persona;
  }
}
