import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../../constants';
import { JobModel } from 'src/app/models/JobModel';
import { HttpAuthService } from 'src/app/components/shared/services/http-auth.service';
import { Observable } from 'rxjs';
import { CleanerModel } from 'src/app/models/CleanerModel';
// import {JobModel} from '../../../models/JobModel';
// import { GenericResponse } from '../../../responses/GenericResponse';
// import { HttpAuthService } from '../../shared/services/http-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CleanersService {
    public  cleaners:Observable<Array<CleanerModel>>;
    private serverUrl = Constants.SERVER_URL;

    constructor(private httpClient: HttpAuthService){}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getCleaners();
    }
    getCleaners() {
        return this.httpClient.get <CleanerModel[]> (this.serverUrl + '/cleaners');
    }
}