import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthenticationService {

	private authUrl: string;
	private loginUrl: string;
	private registerUrl: string;
	private isAuthenticatedUrl: string;
	public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(public http: HttpClient) {
		this.authUrl = 'http://localhost:8082/api/auth/';
		this.loginUrl = this.authUrl + 'login';
		this.registerUrl = this.authUrl + 'register';
		this.isAuthenticatedUrl = this.authUrl + 'isAuthenticated';
	}

	get isLoggedIn() {
		return this.isUserLoggedIn.asObservable();
	}

	authenticateUser(data) {
		return this.http.post(this.loginUrl, data);
	}

	registerUser(data): Promise<boolean> {
		return this.http.post(this.registerUrl, data)
		.map((res) => res['registered'])
		.toPromise();
		
	}

	setBearerToken(token) {
		sessionStorage.setItem('bearerToken', token);
	}

	getBearerToken() {
		return sessionStorage.getItem('bearerToken');
	}

	setUser(userId) {
		sessionStorage.setItem('userId', userId);
	}

	getUser() {
		return sessionStorage.getItem('userId');
	}

	isUserAuthenticated(token): Promise<boolean> {
		return this.http.post(this.isAuthenticatedUrl, {},
			{
				headers: new HttpHeaders()

					.set('Authorization', `Bearer ${token}`)
			})
			.map((res) => res['isAuthenticated'])
			.toPromise();

	}
}
