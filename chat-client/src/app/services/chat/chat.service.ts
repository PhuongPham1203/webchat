import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private socket: Socket;
	private url = 'localhost:3000';

	constructor() {
		this.socket = io(this.url, {transports: ['websocket', 'pulling', 'flashsocket']});
	}

	joinRoom(data: any): void {
		this.socket.emit('join', data);
	}

	sendMessage(data: any) {
		this.socket.emit('message', data);
	}

	getMessage(): Observable<any> {
		return new Observable<{ user: string, message: string }>(observer => {
			this.socket.on('new message', (data) => {
				observer.next(data);
			});

			return () => {
				this.socket.disconnect();
			}
		});
	}

	getStorage() {
		let storage = localStorage.getItem('chats');
		return storage ? JSON.parse(storage) : [];
	}

	setStorage(data: any) {
		localStorage.setItem('chats', data);
	}
}
