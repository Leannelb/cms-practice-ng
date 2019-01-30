import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../constants';
import {JobModel} from '../../../models/JobModel';
import { GenericResponse } from '../../../responses/GenericResponse';
import { HttpAuthService } from '../../shared/services/http-auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {


  private serverUrl = Constants.SERVER_URL;

  constructor(private httpClient: HttpAuthService) { }
  
  public getJobs(ref) {
    return this.httpClient.get <JobModel[]> (this.serverUrl + '/job/listing/'+ref);
  }

  //
  public getJob(ref: string) {
    return this.httpClient.get <JobModel> (this.serverUrl + '/job/' + ref);
  }

  //
  public removeJob(ref: string) {
    return this.httpClient.delete<GenericResponse>(this.serverUrl + '/job/' + ref);
  }

  public createJob(jobRecord) {
    // alert(this.serverUrl + '/job');
    var formData: FormData = new FormData();
    formData.append('title', jobRecord.title);
    formData.append('content', jobRecord.content);
    formData.append('site_ref', jobRecord.site_ref);
    formData.append('slug', jobRecord.slug);
    formData.append('meta_keywords', jobRecord.meta_keywords);
    formData.append('meta_description', jobRecord.meta_description);

    if(jobRecord.image)
      formData.append('image', jobRecord.image);

    return this.httpClient.post<GenericResponse>(this.serverUrl + '/job', formData);
  }

  public updateJob(jobRecord) {
    // alert(this.serverUrl + '/blog/' + ref);
    var formData: FormData = new FormData();
    formData.append('title', jobRecord.title);
    formData.append('content', jobRecord.content);
    formData.append('excerpt', jobRecord.excerpt);
    formData.append('status', jobRecord.status);
    formData.append('ref', jobRecord.ref);
    formData.append('slug', jobRecord.slug);
    formData.append('meta_keywords', jobRecord.meta_keywords);
    formData.append('meta_description', jobRecord.meta_description);
    
    if(jobRecord.image)
      formData.append('image', jobRecord.image);
    
    formData.append('_method', "patch");

    return this.httpClient.post<GenericResponse> (this.serverUrl + '/job', formData);
  }

}
