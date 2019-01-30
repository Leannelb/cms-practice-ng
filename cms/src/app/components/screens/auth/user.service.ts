import { Injectable }               from '@angular/core';
import {HttpClient}                 from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../../constants';
import { GenericResponse } from '../../../responses/GenericResponse';
import { AuthUser } from '../../shared/services/auth.service';
 
@Injectable()
export class UserService {
 
  constructor(private httpClient:HttpClient) {
  }
 
  public loginUser(email:string,password:string):Observable<LoginResponse>{
    let postBody = {
      email:email,
      password:password
    };
    let postUrl = Constants.BASE_SERVER_URL+"/api/auth/login";
    let userLogin:Observable<LoginResponse> = this.httpClient.post<LoginResponse>(postUrl,postBody);
    return userLogin;
  }
 
//   public registerUser(email:string,first_name:string,last_name:string,mobile:string,password:string):Observable<UserRegistrationResponse> {
//     let postBody = {
//       email:email,
//       first_name:first_name,
//       last_name:last_name,
//       mobile:mobile,
//       password:password
//     };
//     let postUrl = this.constantProviderService.UserRegistrationPostUrl;
//     let userRegistration:Observable<UserRegistrationResponse> = this.httpClient.post<UserRegistrationResponse>(postUrl,postBody);
//     return   userRegistration;
//   }
 
}


export interface LoginResponse extends GenericResponse{
  user?:AuthUser|null
}