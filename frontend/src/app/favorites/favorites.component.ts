import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  newsFavorite : Array<News> = [];
  errMessage : string = '';

  constructor(private newsService: NewsService, private authService : AuthenticationService) { }
  ngOnInit() {
    this.getFavoriteNews();
  }

  getFavoriteNews(){
    this.newsService.getFavoriteNews(this.authService.getUser()).subscribe(
      data => this.newsFavorite = data,
      err => { this.errMessage = err.message; });
  }
}
