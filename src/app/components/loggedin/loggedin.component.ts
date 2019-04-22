import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  private token: String;
  name: String;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.authService.handleLogin(this.route.snapshot.queryParams);
    this.authService.retrieveProfile().subscribe((profile: Profile) => {
      this.name = profile.Name;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, (e) => {
      throw new Error(e);
    });
  }
}
