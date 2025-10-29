import { CountryDto } from "../dtos/country.dto";

export class PersonModel {
  id_persona: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: number;
  genero: string;
  ciudad: string;
  edad: number;
  id_pais: number;  
  cedula: string;
  pais: CountryDto

  constructor(
    id_persona: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: number,
    genero: string,
    ciudad: string,
    edad: number,
    id_pais: number,
    cedula: string,
    pais: CountryDto
    
  ) {
    this.id_persona = id_persona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.genero = genero;
    this.ciudad = ciudad;
    this.edad = edad;
    this.id_pais = id_pais;
    this.cedula=cedula;
    this.pais=pais;
  }
}