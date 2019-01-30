import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user:AuthUser;
  public userName:string;

  constructor(private authService:AuthService) { 

  }

  ngOnInit() {
    this.user = this.authService.getStoredUser()
    if(this.user != null){
      this.userName = this.user.user_name;
    }
  }

  logout(){
    this.authService.logout();
  }

}
