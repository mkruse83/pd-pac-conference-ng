import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Talk from 'src/app/entities/talk';
import { TopicsService } from 'src/app/services/topics.service';
import { ConferencesService } from 'src/app/services/conferences.service';
import { TalksService } from 'src/app/services/talks.service';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {

  talks: Talk[];
  yearAndMonth: string;
  isConference: boolean;

  constructor(private route: ActivatedRoute, private topicsService: TopicsService, private talksService: TalksService) { 
  }

  ngOnInit() {
    this.isConference = this.route.snapshot.params['type'] === "conference";
    if (this.isConference) {
      const conferenceId = this.route.snapshot.params['conferenceId'];
      this.talksService.getTalksByConferenceId(conferenceId).subscribe((talks: Talk[]) => {
        this.talks = talks.sort((a,b) => a.from.getTime() - b.from.getTime());
      });
    } else {
      const topic = this.route.snapshot.params['topic'];
      this.yearAndMonth = this.route.snapshot.params['yearAndMonth'];
      this.topicsService.getTalksToTopic(this.yearAndMonth, topic).subscribe((talks: Talk[]) => {
        this.talks = talks;
      });
    }
  }
}
