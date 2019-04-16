import {Component, OnInit} from '@angular/core';
// import {Claim} from "../../shared/model/Claim";
// import {ClaimService} from "../../shared/claim.service";

@Component({
  selector: 'app-claim-list',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferenceComponent implements OnInit {

//   claims: Claim[];

//   constructor(private claimService: ClaimService) {
//   }

  ngOnInit() {
    // this.claimService.getAll().subscribe(res => {
    //   this.claims = res;
    // })
  }

}