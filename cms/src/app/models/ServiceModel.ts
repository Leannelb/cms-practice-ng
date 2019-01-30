import {TagModel} from './TagModel';

export interface ServiceModel {
  id?: number;
  title?: string,
  name?: string;
  content?: string;
  ref?: string;
  author?: string;
  status?: string;
  status_id?: number;
  date?: string;
  created_at?: string;
  update_at?: string;
  tags?: TagModel[];
  image_url?:string;
  site_ref?:string;
  excerpt?:string;
  slug?:string;
  meta_keywords?:string;
  meta_description?:string;
}
