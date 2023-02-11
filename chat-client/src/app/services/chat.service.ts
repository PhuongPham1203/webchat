import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MessageChat } from '../models/chat.model';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public message$: BehaviorSubject<MessageChat> = new BehaviorSubject<MessageChat>(<MessageChat>{});

	private socket: Socket;
	private url = 'https://boxboxlux-server.herokuapp.com/';

	constructor(
		private http: HttpService,
		private cookieService: CookieService
	) {
		this.socket = io(this.url, { transports: ['websocket', 'pulling', 'flashsocket'] });
	}

	joinRoom(data: any): void {
		this.socket.emit('join', data);
	}

	public sendMessage(message: MessageChat) {
		this.socket.emit('message', message);
	}

	public getListMessage(id1: string = '', id2: string = '') {
		return this.http.post('getlistchat', { id1: id1, id2: id2 })
	}

	public getNewMessage = () => {
		this.socket.on('newMessage', (message) => {
			//console.log(message);
			this.message$.next(message);
		});

		return this.message$.asObservable();
	};

	getStorage() {
		let storage = localStorage.getItem('chats');
		return storage ? JSON.parse(storage) : [];
	}

	setStorage(data: any) {
		localStorage.setItem('chats', data);
	}

	public getPublicKeyOfFriend(id1: string = '', id2: string = '') {
		return this.http.post('getpublickey', { id1: id1, id2: id2 });
	}

}
