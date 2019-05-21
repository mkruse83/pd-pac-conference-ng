import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topics: string[][];
  yearsAndMonths: string[];
  yearAndMonth: string;


  constructor(
    private topicsService: TopicsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.yearAndMonth = this.route.snapshot.params['yearAndMonth'];
    this.yearsAndMonths = [
      '2019-1',
      '2019-2',
      '2019-3',
      '2019-4',
      '2019-5',
      '2019-6',
      '2019-7',
      '2019-8',
      '2019-9',
      '2019-10',
      '2019-11',
      '2019-12',
      '2020-1',
      '2020-2',
      '2020-3',
      '2020-4',
      '2020-5',
      '2020-6',
      '2020-7',
      '2020-8',
      '2020-9',
      '2020-10',
      '2020-11',
      '2020-12',
    ]
  }

  loadTopics() {
    this.topicsService.getTopics(this.yearAndMonth).subscribe(topics => {
      this.topics = topics;
    })
  }

}
