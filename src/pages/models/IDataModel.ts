// type TVariedad = 'Abocado' | 'Semi seco' | 'Semi dulce' | 'Dulce';
// type TTipo = 'Joven' | 'Crianza' | 'Reserva' | 'Gran reserva';
// type TColor = 'Tinto' | 'Blanco' | 'Rosado';


export interface IData {
    userId: number,
    año: number,
    variedad: string,
    tipo: string,
    color: string,
    temperatura: number,
    graduacion: number,
    ph: number,
    observaciones: string
}
export interface IDataModel extends IData {
    id: number,
}
