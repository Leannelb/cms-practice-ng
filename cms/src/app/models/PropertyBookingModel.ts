export interface PropertyBookingModel{
  site_id?: number;
  // uuid?: string;
  propertyRef?: string;
  locationRef?:string;
  // location_id?: any;
  arrival_date?: string;
  departure_date?: string;
  number_of_guests?: number;//*
  // mail_sent?: number;
  // mail_sent_to_client?: number;
  firstname?: string;//*
  lastname?: string;//*
  email?: string;//*
  message?: string;//*
  price?:number;
  // terms_accepted_date?: string;
  // marketing_accepted_date?: any;
  // created_at?: string;
  // updated_at?: string;
  // deleted_at?: any;
  ref?: string;
  isEditingGlobalBooking?:boolean;
  clientRef?:string;
}
