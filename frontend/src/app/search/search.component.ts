import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  newsSearch : Array<News> = [];
  searchText : string = '';
  errMessage : string = '';

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute) {
    //this.searchText = this.activatedRoute.snapshot.paramMap.get('searchText');
    //this.getSearchedNews(this.searchText);

    activatedRoute.params.subscribe(val => {      
      this.getSearchedNews(val.searchText);
    });
   }
  ngOnInit() {    
  }

  getSearchedNews(searchText){
    this.newsService.getSearchedNews(searchText).subscribe(
      data => this.newsSearch = data,
      err => { this.errMessage = err.message; });
  }

}
