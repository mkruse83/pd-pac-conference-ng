import {Component, OnInit, ViewChild} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
// import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedIn: boolean;
  name: String;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      this.authService.retrieveProfile().subscribe(profile => {
        this.name = profile.Name;
      });
    })
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }
}
