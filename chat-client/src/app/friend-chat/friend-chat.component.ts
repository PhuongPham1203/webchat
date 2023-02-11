import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FriendChat } from '../models/chat.model';
import { FriendSearch } from '../models/friend.model';
import { AuthService } from '../services/auth.service';
import { FriendService } from '../services/friend.service';

@Component({
	selector: 'app-friend-chat',
	templateUrl: './friend-chat.component.html',
	styleUrls: ['./friend-chat.component.scss']
})
export class FriendChatComponent implements OnInit, AfterViewInit {
	@Input() id = '';

	@Output() chatWithFriend = new EventEmitter<string>();

	public friend: FriendChat | null = null;


	constructor(
		public authService: AuthService,
		private router: Router,
		private cookieService: CookieService,
		private friendService: FriendService,

	) { }


	ngOnInit(): void {

	}

	ngAfterViewInit(): void {
		this.friendService.getFriendById(this.id, this.authService.getUser()?.id + "").subscribe(
			res => {
				if (res.data) {
					this.friend = {
						id: res.data.id,
						name: res.data.name,
						username: res.data.username,
						avataUrl: res.data.avataUrl,
						roomId: res.data.roomId
					}
				}
			}
		);
	}

	joinChatWithFriend() {
		this.chatWithFriend.emit(this.friend?.id);
	}
}
