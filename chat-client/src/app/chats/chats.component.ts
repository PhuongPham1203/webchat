import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { FriendChat } from '../models/chat.model';
import { Friend } from '../models/friend.model';
import { AuthService } from '../services/auth.service';
import { FriendService } from '../services/friend.service';

@Component({
	selector: 'app-chats',
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, AfterViewInit {

	public idFriendChat: string = "";

	public listAllFriendChat: Friend[] = [];

	//@ViewChild(ChatboxComponent) childChatBox: ChatboxComponent;
	@ViewChild('chatbox', { static: false }) childChatBox: ChatboxComponent | any;

	constructor(
		public authService: AuthService,
		private router: Router,
		private cookieService: CookieService,
		private friendService: FriendService,

	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.getListFriend();
	}

	getListFriend() {
		this.friendService.getListFriend(this.authService.getUser()?.id!).subscribe(
			res => {
				if (res.data) {
					this.listAllFriendChat = res.data;
					//console.log(this.listAllFriendChat);
				}
			}
		);
	}

	chatWithFriend($event: any) {
		//console.log("chat with id : " + $event);
		this.idFriendChat = $event;
		if (this.childChatBox) {
			//console.log("reload")
			this.childChatBox.reloadPage(this.idFriendChat);
		}
	}

	

}

