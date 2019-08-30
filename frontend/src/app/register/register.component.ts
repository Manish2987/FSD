import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { promise } from 'protractor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	firstname: any;
	lastname: any;
	email: any;
	username: any;
	password: any;
	passwordconfirm: any;

	isPasswordMatched: Observable<boolean>;
	passwordConfirmMatch: BehaviorSubject<boolean>;

	submitMessage: string;
	uniqueUsernameMessage: string;
	passwordMismatchMessage: string;

	bearerToken: any;
	constructor(
		private routerService: RouterService,
		private _authService: AuthenticationService) {
		this.firstname = new FormControl('', Validators.required);
		this.lastname = new FormControl('', Validators.required);
		this.email = new FormControl('', Validators.required);
		this.username = new FormControl('', Validators.required);
		this.password = new FormControl('', Validators.required);
		this.passwordconfirm = new FormControl('', Validators.required);
	}

	ngOnInit() {
		this.passwordConfirmMatch = new BehaviorSubject<boolean>(true);
		this.isPasswordMatched = this.passwordConfirmMatch;
	}


	registerUser() {

		if (this.password.value != this.passwordconfirm.value) {
			//this.passwordConfirmMatch.next(false);
			this.passwordMismatchMessage = "Password doesn't match";
			return;
		}
		else {
			this.passwordMismatchMessage = '';
		}

		const firstname = this.firstname;
		const lastname = this.lastname;
		const email = this.email;
		const userId = this.username;
		const password = this.password;

		if (
			firstname.status === 'INVALID' ||
			lastname.status === 'INVALID' ||
			email.status === 'INVALID' ||
			userId.status === 'INVALID' ||
			password.status === 'INVALID') {
			this.submitMessage = 'Please enter the above missing fields.';
		} else {
			this.submitMessage = '';
			let that = this;
			const booleanPromise = this._authService.registerUser({
				firstname: firstname.value,
				lastname: lastname.value,
				email: email.value,
				username: userId.value,
				password: password.value
			})
				.then(function (registered) {
					if (registered) {
						console.log('User registred ' + registered);
						that.routeToLogin();
					}
					else {
						that.uniqueUsernameMessage = 'Username already taken.';
					}
				}, function (e) {
					that.uniqueUsernameMessage = 'Username already taken. Choose another.';
					return e;
				});


		}
	}

	routeToLogin() {
		this.routerService.routeToLogin();
	}
}
