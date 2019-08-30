import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { News } from '../news';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NewsService {
	news: Array<News>;	
	newsHeadlinesSubject: BehaviorSubject<Array<News>>;	
	newsCategoryWiseSubject: BehaviorSubject<Array<News>>;	
	newsSearchSubject: BehaviorSubject<Array<News>>;	
	newsFavoriteSubject: BehaviorSubject<Array<News>>;
	
	token: any;

	urlHeadlines: string = 'http://localhost:8081/api/news/headlines';
	urlcategory: string = 'http://localhost:8081/api/news/category/';
	urlSearch: string = 'http://localhost:8081/api/news/search/';
	urlFavorite: string = 'http://localhost:8081/api/news/favorite/';

	constructor(private http: HttpClient, private _authService: AuthenticationService) {
		//this.token = this.authService.getBearerToken();
		
		this.newsHeadlinesSubject = new BehaviorSubject(this.news);
		
		this.newsCategoryWiseSubject = new BehaviorSubject(this.news);
		
		this.newsSearchSubject = new BehaviorSubject(this.news);
		
		this.newsFavoriteSubject = new BehaviorSubject(this.news);
	}	

	fetchNewsFromServer(url, newsSubject) {		
		this.token = this._authService.getBearerToken();
		this.http.get(url,{	headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)})		
		.subscribe(newsList => {			
			this.news = newsList as News[];
			newsSubject.next(this.news);			
		});
	}

	getNewsHeadlines(): Observable<Array<News>> {
		this.fetchNewsFromServer(this.urlHeadlines, this.newsHeadlinesSubject);
		return this.newsHeadlinesSubject;
	}

	getCategoryWiseNews(currentCategory): Observable<Array<News>> {		
		this.fetchNewsFromServer(this.urlcategory + currentCategory, this.newsCategoryWiseSubject);
		return this.newsCategoryWiseSubject;
	}

	getSearchedNews(searchText): Observable<Array<News>> {
		this.fetchNewsFromServer(this.urlSearch + searchText, this.newsSearchSubject);
		return this.newsSearchSubject;
	}

	getFavoriteNews(userId): Observable<Array<News>> {
		console.log(this.urlFavorite + userId);
		this.fetchNewsFromServer(this.urlFavorite + userId, this.newsFavoriteSubject);
		return this.newsFavoriteSubject;
	}

	addToFavoriteNews(news : News, userId : string): Observable<News> {	
		this.token = this._authService.getBearerToken();	
		console.log('news to add : ' + news.title);
		news.user = userId;
		return this.http.post<News>(this.urlFavorite + 'add', news,{	headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});

	}

	deleteFromFavoriteNews(newsId):Observable<any> {
		this.token = this._authService.getBearerToken();
		console.log(this.urlFavorite + 'delete/' + newsId);
		return this.http.delete<boolean>(this.urlFavorite + 'delete/' + newsId ,{	headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
	}	
}


