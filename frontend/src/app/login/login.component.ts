import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	username: any;
	password: any;
	submitMessage: string;
	bearerToken: any;
	constructor(
		private routerService: RouterService,
		private _authService: AuthenticationService) {
		this.username = new FormControl('', Validators.required);
		this.password = new FormControl('', Validators.required);
	}

	loginSubmit() {
		const userId = this.username;
		const password = this.password;

		if (userId.status === 'INVALID' || password.status === 'INVALID') {
			this.submitMessage = 'Please enter the above missing fields.';
		} else {
			this.submitMessage = '';
			this._authService.authenticateUser({ username: userId.value, password: password.value }).subscribe(
				res => {
					//console.log(res['token']);
					this.bearerToken = res['token'];
					this._authService.isUserLoggedIn.next(true);
					this._authService.setBearerToken(this.bearerToken);
					console.log(this._authService.getBearerToken());
					this._authService.setUser(userId.value);
					this.routerService.routeToHome();
				},
				err => {
					if (err !== undefined && err.error !== undefined) {
						this.submitMessage = err.error.message;
					} else {
						this.submitMessage = err.message;
					}
					this._authService.isUserLoggedIn.next(false);
				});
		}
	}

	routeToRegister(){
		this.routerService.routeToRegister();
	}
}
