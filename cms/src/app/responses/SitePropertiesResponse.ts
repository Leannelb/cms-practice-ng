export interface SitePropertiesResponse{
  sites:SimplifiedSite[];
  properties:SimplifiedPropertySite[];
  status:number;
  message:string;
}

export interface SimplifiedPropertySite{ref:string,name:string,sites:boolean[]};
export interface SimplifiedSite{ref:string,name:string,sites:boolean[]};
