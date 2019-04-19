import {Component, OnInit, ViewChild} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
// import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() {
  }

  ngOnInit() {
    // this.trigger.openMenu();
  }
}
