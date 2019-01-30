import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public sideBarItems:Array<SideBarItem>;


  constructor(private authService:AuthService) {
  }

  ngOnInit() {
    let user = this.authService.getStoredUser();
    if(user != null){
      
      if(user.role == "Admin"){
        this.sideBarItems = this.AdminSideBar(); 
      }else if(user.role == "SiteAdmin"){
        this.sideBarItems = this.siteAdminSideBar(user.client_ref); 
      }
    }
  }

  private siteAdminSideBar(client_ref:string):Array<SideBarItem>{
    if(client_ref != null && client_ref.length > 0){
      return [
        {
          name:"Properties",
          icon:"glyphicon glyphicon-tree-deciduous",
          link:"/properties/listing/"+client_ref
        },
        {
          name:"Sites",
          icon:"glyphicon glyphicon-cloud",
          link:"/sites/listing/"+client_ref
        },
        {
          name:"Bookings",
          icon:"glyphicon glyphicon-calendar",
          link:"/bookings/"+client_ref
        },
        {
          name:"Settings",
          icon:"glyphicon glyphicon-pencil",
          link:"/settings/"+client_ref+'/main'
        }
      ];
    }else{
      return [];
    }
  }

  private AdminSideBar():Array<SideBarItem>{
    return [
      {
        name:"Temp section",
        icon:"icon-user",
        link:"/nothing"
      }
    ];
  }


}

export interface SideBarItem{
  name:string;
  icon:string;
  link:string;
}