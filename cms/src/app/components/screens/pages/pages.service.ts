import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../constants';
import {PageModel} from '../../../models/PageModel';
import { GenericResponse } from '../../../responses/GenericResponse';
import { HttpAuthService } from '../../shared/services/http-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagesService {


  private serverUrl = Constants.SERVER_URL;

  constructor(private httpClient: HttpAuthService) { }
  
  public getPages(ref) {
    return this.httpClient.get <PageModel[]> (this.serverUrl + '/page/listing/'+ref);
  }

  //
  public getPage(ref: string) {
    return this.httpClient.get <PageModel> (this.serverUrl + '/page/' + ref);
  }

  //
  public removePage(ref: string) {
    return this.httpClient.delete<GenericResponse>(this.serverUrl + '/page/' + ref);
  }

  public createPage(pageRecord) {
    // alert(this.serverUrl + '/page');
    var formData: FormData = new FormData();
    formData.append('title', pageRecord.title);
    formData.append('content', pageRecord.content);
    formData.append('site_ref', pageRecord.site_ref);
    formData.append('slug', pageRecord.slug);
    formData.append('meta_keywords', pageRecord.meta_keywords);
    formData.append('meta_description', pageRecord.meta_description);

    if(pageRecord.image)
      formData.append('image', pageRecord.image);

    return this.httpClient.post<GenericResponse>(this.serverUrl + '/page', formData);
  }

  public updatePage(pageRecord) {
    // alert(this.serverUrl + '/blog/' + ref);
    var formData: FormData = new FormData();
    formData.append('title', pageRecord.title);
    formData.append('content', pageRecord.content);
    formData.append('excerpt', pageRecord.excerpt);
    formData.append('status', pageRecord.status);
    formData.append('ref', pageRecord.ref);
    formData.append('slug', pageRecord.slug);
    formData.append('meta_keywords', pageRecord.meta_keywords);
    formData.append('meta_description', pageRecord.meta_description);
    
    if(pageRecord.image)
      formData.append('image', pageRecord.image);
    
    formData.append('_method', "patch");

    return this.httpClient.post<GenericResponse> (this.serverUrl + '/page', formData);
  }

}
