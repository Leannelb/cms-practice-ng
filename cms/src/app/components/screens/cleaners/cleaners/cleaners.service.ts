import { Injectable } from '@angular/core';
import { Constants } from '../../../../constants';
import { HttpAuthService } from 'src/app/components/shared/services/http-auth.service';
import { Observable } from 'rxjs';
import { CleanerModel } from 'src/app/models/CleanerModel';

@Injectable({
  providedIn: 'root'
})
export class CleanersService {

    public cleaners:Observable<Array<CleanerModel>>;
    private serverUrl = Constants.SERVER_URL;
  
    constructor(private httpClient: HttpAuthService) { }
    
  ngOnInit(): void {
    this.getCleaners();
  }
  
    public getCleaners() {
      return this.httpClient.get <CleanerModel[]> (this.serverUrl + '/cleaners  ');
    }
  }