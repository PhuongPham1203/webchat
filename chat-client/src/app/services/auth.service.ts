import { UserSignIn } from './../models/user.model';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

	private _user: UserSignIn | null = null;


	constructor(
		private http: HttpService,
		private cookieService: CookieService
	) {

	}

	sighIn(username: string = '', password: string = '') {
		return this.http.post('signin', { username: username, password: password });
	}

	sighInWithToken(token: string = '') {
		return this.http.post('signintoken', { token: token });
	}

	public getUser(): UserSignIn | null {
		return this._user;
	}

	public setUser(value: UserSignIn | null) {
		this._user = value;
	}

	public sighout() {
		this.setUser(null);
		this.cookieService.delete('token');
	}

	public sighUp(name: string = '', username: string = '', password: string = '') {
		return this.http.post('signup', { name: name, username: username, password: password });
	}

}
