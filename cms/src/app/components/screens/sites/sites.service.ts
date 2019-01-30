import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../constants';
import { Observable } from 'rxjs';
import { SiteModel } from '../../../models/SiteModel';
import { GenericResponse } from '../../../responses/GenericResponse';
import { SitePropertiesResponse, SimplifiedPropertySite } from 'src/app/responses/SitePropertiesResponse';
import { PropertyModel } from 'src/app/models/PropertyModel';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  public clients:Observable<Array<SiteModel>>;

  private SERVER_URL = Constants.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  public getSites(ref){

    return this.httpClient.get<Array<SiteModel>>(this.SERVER_URL+"/site/listing/"+ref);
  }

  public getSite(ref:string){
    return this.httpClient.get<SiteModel>(this.SERVER_URL+"/site/"+ref);
  }

  public deleteSite(ref:string){
    return this.httpClient.delete<GenericResponse>(this.SERVER_URL+"/site/"+ref);
  }

  public createSite(site:CreateUpdateSiteRequestBody){
    return this.httpClient.post<GenericResponse>(this.SERVER_URL+"/site",site);
  }

  public updateSite(site:CreateUpdateSiteRequestBody){
    site._method = "patch";
    return this.httpClient.post<GenericResponse>(this.SERVER_URL+"/site",site);
  }


  public getSitePropertyListing(clientRef:string){
    return this.httpClient.get<SitePropertiesResponse>(this.SERVER_URL+"/site/properties/"+clientRef);
  }


  public toggleAssignPropertyAssignment(property:PropertyModel | SimplifiedPropertySite,site:SiteModel | SimplifiedPropertySite ,inSite:boolean){
    let request = {
      propertyRef:property.ref,
      siteRef:site.ref,
      inSite:inSite
    }
    return this.httpClient.post<GenericResponse>(this.SERVER_URL+"/site/assign/property",request);
  }

  // public editSite(site:CreateUpdateSiteRequestBody){
  //   return this.httpClient.put<GenericResponse>(this.SERVER_URL+"/site",site);
  // }
}

export interface CreateUpdateSiteRequestBody{
  name:string;
  ref?:string
  domain:string;
  client_ref?:string;
  _method?:string;
}
