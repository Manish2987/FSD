import { Component, OnInit, Input } from '@angular/core';
import { News } from '../news';
import { RouterService } from '../services/router.service';
import { NewsService } from '../services/news.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {  
  @Input()
  news: News;
  isFavorite: boolean = false;
  errMessage: string = '';
  constructor(private routerService: RouterService, private newsService: NewsService, private authService: AuthenticationService) {

  }
  ngOnInit() {    
    this.isFavorite = this.news != undefined && this.news.id != undefined ? true : false;
  }

  addToFavorite(toAdd) {

    if (toAdd) {      
      this.newsService.addToFavoriteNews(this.news, this.authService.getUser()).subscribe(
        data => {          
          this.news = data;
          this.isFavorite = toAdd;
          this.newsService.getFavoriteNews(this.authService.getUser());
          this.errMessage = '';
        },
        err => {          
          this.errMessage = err.message;
        });

    } else {      
      console.log('removing news with id' + this.news.id);
      this.newsService.deleteFromFavoriteNews(this.news.id).subscribe(
        data => {          
          this.isFavorite = toAdd;
          this.newsService.getFavoriteNews(this.authService.getUser());
          this.errMessage = '';
        },
        err => {          
          this.errMessage = err.message;
        });
    }
  }
}