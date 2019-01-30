import { MetaModel } from './MetaModel';
import { ClientModel } from "./ClientModel";

export interface PropertyModel {
    name:string;
    ref:string;
    slug : string;
    content:string;
    excerpt:string;
    image_listing_thumb_path:string;
    image_featured_path:string;
    image_home_thumb_path: string;
    location: string;
    price_from: string;
    client:ClientModel;
    client_id:number;
    longitude:number;
    latitude:number;
    sleeps:string;
    bedrooms:string;
    bathrooms:string;
    size:string;
    type:string;
    meta_keywords:string;
    meta_description:string;
    //meta?:MetaModel;
    temp_old_reference?:string; //being used to handle crawling from live SLM site before swap
}
