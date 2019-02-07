import { Injectable } from '@angular/core';
import { Constants } from '../../../../constants';
import { JobModel } from 'src/app/models/JobModel';
import { HttpAuthService } from 'src/app/components/shared/services/http-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  public jobs:Observable<Array<JobModel>>;
  private serverUrl = Constants.SERVER_URL;

  constructor(private httpClient: HttpAuthService) { }
  
ngOnInit(): void {
  this.getJobs();
}

  public getJobs() {
    return this.httpClient.get <JobModel[]> (this.serverUrl + '/jobs');
  }
}
