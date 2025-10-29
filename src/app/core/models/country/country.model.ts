
export class CountryModel {
    id_pais: number;
    nombre: string;
    codigo: string;
    constructor(
        id_pais: number,
        nombre: string,
        codigo: string,
    ) {
        this.id_pais = id_pais;
        this.nombre = nombre;
        this.codigo = codigo;
    }
}