import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Talk from 'src/app/entities/talk';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {

  talks: Talk[];
  yearAndMonth: string;

  constructor(private route: ActivatedRoute, private topicsService: TopicsService) { 
  }

  ngOnInit() {
    const topic = this.route.snapshot.params['topic'];
    this.yearAndMonth = this.route.snapshot.params['yearAndMonth'];
    this.topicsService.getTalksToTopic(this.yearAndMonth, topic).subscribe((talks: Talk[]) => {
      this.talks = talks;
    })
  }
}
