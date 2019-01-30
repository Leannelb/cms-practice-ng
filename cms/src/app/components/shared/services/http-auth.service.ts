import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from '../../../../../node_modules/rxjs';

/**
 * This class is a wrapper around the angular http client library, its scope is to easily add authorization headers to every request
 */
@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  constructor(private httpClient:HttpClient,private authService:AuthService) {}

  private createAuthorizationHeader():HttpHeaders {
    let headers = new HttpHeaders();
    let user = this.authService.getStoredUser();
    if(user != null){
      headers = headers.set('Authorization', 'Bearer ' + user.access_token)
    }
    return headers;
  }

  public get<T>(url):Observable<T> {
    let headers = this.createAuthorizationHeader();
    return this.httpClient.get<T>(url, {
      headers: headers
    });
  }


  public getBlob(url:string){
    let headers = this.createAuthorizationHeader();
    return this.httpClient.get(url, {headers:headers,responseType: 'blob'});
  }

  public post<T>(url, data):Observable<T> {
    let headers =  this.createAuthorizationHeader();

    return this.httpClient.post<T>(url, data, {
      headers: headers
    });
  }

  public put<T>(url, data):Observable<T> {
    let headers =  this.createAuthorizationHeader();
    return this.httpClient.put<T>(url, data, {
      headers: headers
    });
  }

  public delete<T>(url):Observable<T> {
    let headers =  this.createAuthorizationHeader();
    return this.httpClient.delete<T>(url, {
      headers: headers
    });
  }
  
}
