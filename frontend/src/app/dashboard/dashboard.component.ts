import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newsHeadlines : Array<News> = [];
  newsCategoryWise : Array<News> = [];  
  errMessage : string = '';

  currentCategory = "General";  
  categoryList = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology"
  ]; 

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getHeadlines();
    this.getCategoryWiseNews();
  }
  getHeadlines() {
    this.newsService.getNewsHeadlines().subscribe(
      data => this.newsHeadlines = data,
      err => { this.errMessage = err.message; });
  }

  getCategoryWiseNews(){
    this.newsService.getCategoryWiseNews(this.currentCategory).subscribe(
      data => this.newsCategoryWise = data,
      err => { this.errMessage = err.message; });
  }

  onChange() {
    this.getCategoryWiseNews();
  }
  
}
