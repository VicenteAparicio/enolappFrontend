type TVariedad = 'Abocado' | 'Semi seco' | 'Semi dulce' | 'Dulce';
type TTipo = 'Joven' | 'Crianza' | 'Reserva' | 'Gran reserva';
type TColor = 'Tinto' | 'Blanco' | 'Rosado';

export interface IDataModel {
    id: number,
    userId: number,
    año: number,
    variedad: TVariedad,
    tipo: TTipo,
    color: TColor,
    temperatura: number,
    graduacion: number,
    ph: number,
    observaciones: string
}