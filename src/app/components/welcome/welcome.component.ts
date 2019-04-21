import { Component, OnInit } from '@angular/core';
import { YearsService } from 'src/app/services/years.service';
import { map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private years = [];

  constructor(private yearsService: YearsService) { }

  ngOnInit() {
    this.yearsService.getYears().pipe(
      toArray(),
      map((data: Date[]) => {
        data.sort((a, b) => {
          return a < b ? -1 : 1;
        });
        return data;
      })).subscribe((years) => {
        this.years = years;
      })
  }

}
