import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('txtEmail')    public txtEmail:ElementRef;
  @ViewChild('txtPassword') public txtPassword:ElementRef;

  public errorMsg:string;
  public loggingIn:boolean;

  constructor(private userService:UserService,private authService:AuthService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.errorMsg    = null;
    this.loggingIn   = false;

    this.renderer.addClass(document.body, 'login');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }
  
  private validateCredentials(){
    if(this.txtEmail != null && this.txtPassword != null){
      if(this.txtEmail.nativeElement.value.length <= 0){
        this.errorMsg = "Please enter a valid email address";
        return false;
      }
      if(!this.validateEmail(this.txtEmail.nativeElement.value)){
        this.errorMsg = "The entered email is not a valid email address";
        return false;
      }
      if(this.txtPassword.nativeElement.value.length <= 0){
        this.errorMsg = "Please enter a valid password";
        return false;
      }
      this.errorMsg = null;
      return true;
    }else{
      return false;
    }
  }

  public login(){
    if(this.validateCredentials() && this.loggingIn == false){
      this.loggingIn = true;
      this.userService.loginUser(this.txtEmail.nativeElement.value,this.txtPassword.nativeElement.value).subscribe((response)=>{
        if(response.status == 1){
          this.authService.login(response.user);
        }else{
          this.errorMsg = response.message;
        }
        this.loggingIn = false;
      });
    }
  }

  private validateEmail(email:string):boolean {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}