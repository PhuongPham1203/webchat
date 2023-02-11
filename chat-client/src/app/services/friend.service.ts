import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class FriendService {


	constructor(
		private http: HttpService,
		private cookieService: CookieService
	) {

	}

	getListFriend(id: string) {
		return this.http.post('getlistfriend', { id: id });
	}

	searchFriend(username: string, id: string) {
		return this.http.post('findusername', { username: username, id: id });
	}

	addFriend(id1: string, id2: string) {
		return this.http.post('sendrequestmakefriend', { id1: id1, id2: id2 });
	}

	getFriendById(id1: string, id2: string) {
		return this.http.post('finduserbyid', { id1: id1, id2: id2 });
	}

	acceptFriend(id1: string, id2: string) {
		return this.http.post('acceptrequestmakefriend', { id1: id1, id2: id2 });
	}

	getListChat(id: string) {
		return this.http.post('getlistchat', { id: id });
	}

}
