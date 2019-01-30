export interface RateModel {
    ref?: string;
    name:string;
    date_to: string;
    date_from: string;
    property_ref?: string;
    price_per_night:number;
}