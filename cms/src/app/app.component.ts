import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  auth = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    if (this.authService.getStoredUser() == null) {
      this.auth = false;
    } else {
      this.auth = true;
    }

    this.authService.UserLoggedInSubject.subscribe((user) => {
      if (user == null) {
        this.auth = false;
      } else {
        this.auth = true;
      }
    });
  }

}
