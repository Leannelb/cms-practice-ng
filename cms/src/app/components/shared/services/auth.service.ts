import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalService } from './modal.service';
 
@Injectable()
export class AuthService {
 
  public UserLoggedInSubject:Subject<AuthUser>;
  public logoutTime = 10080;//1 week (in minutes)
  public logoutDialogShown:boolean;
 
  constructor(private router:Router,private modalService:ModalService) {
    this.UserLoggedInSubject = new Subject<AuthUser>();
    this.logoutDialogShown = false;
  }
 
  public login(authUser:AuthUser){
    this.storeUser(authUser);
    this.UserLoggedInSubject.next(authUser);
    this.logoutDialogShown = false;
    return this.getStoredUser();
  }
 
  public logout(redirectToLogin=true){
    if(typeof window.localStorage.user != 'undefined' && window.localStorage.user != null){
      window.localStorage.user = null;
      this.UserLoggedInSubject.next(null);
      if(this.logoutDialogShown == false){
        // alert("You have been logged out");
        if(redirectToLogin ){
          this.router.navigateByUrl("/");
        }
        this.logoutDialogShown = true;
      }
    }
  }
 
  private storeUser(authUser:AuthUser){
    window.localStorage.user = JSON.stringify(authUser);
  }
 
  public getStoredUser():AuthUser{
    if(typeof window.localStorage.user != 'undefined' && window.localStorage.user != null && window.localStorage.user != 'null'){
      let parsedUser:AuthUser    =   JSON.parse(window.localStorage.user);
      // let tokenLifeSpan =   this.addMinutes(new Date(parsedUser.expires_in*1000),this.logoutTime);
      let d = new Date();
      let currentTime = Math.round(d.getTime() / 1000);
      if(currentTime < parsedUser.expires_at){
        return parsedUser;
      }
    }
    //user token has expired
    this.modalService.showAlertModalSubject.next({messages:['Your session has expired, please login']});
    this.logout();
    return null;
  }
 
  private addMinutes(date:Date, minutes:number) :Date{
    return new Date(date.getTime() + minutes*60000);
  }
 
}
export enum UserRole {Admin,SiteAdmin}

export interface AuthUser{
  access_token:string;
  token_type:string;
  expires_in:number;
  expires_at:number;
  user_name:string;
  role:string;
  client_ref:string;
}