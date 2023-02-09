import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {


	constructor(private http: HttpService) { }

	sighIn(username: string = '', password: string = '') {

		return this.http.post('signin', { username: username, password: password });

	}


}
