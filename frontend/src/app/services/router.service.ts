import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable()
export class RouterService {

	constructor(public router: Router, private location: Location) { }

	routeToLogin() {
		this.router.navigate(['login']);
	}

	routeToDashboard() {
		this.router.navigate(['dashboard']);
	}
	routeToHome() {
		this.router.navigate(['home']);
	}
	routeToSearchView(searchText) {
		this.router.navigate(['search', searchText]);
	}
	routeToFavorites() {
		this.router.navigate(['favorites']);
	}
	routeBack() {
		this.location.back();
	}
	routeToRegister() {
		this.router.navigate(['register']);
	}
}
