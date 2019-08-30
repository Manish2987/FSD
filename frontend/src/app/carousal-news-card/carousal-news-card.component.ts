import { Component, OnInit, Input } from '@angular/core';
import { News } from '../news';

@Component({
  selector: 'app-carousal-news-card',
  templateUrl: './carousal-news-card.component.html',
  styleUrls: ['./carousal-news-card.component.css']
})
export class CarousalNewsCardComponent implements OnInit {
  @Input()
  news: News;
  constructor() { }

  ngOnInit() {
  }

}
