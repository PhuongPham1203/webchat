import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Friend, FriendSearch } from '../models/friend.model';
import { AuthService } from '../services/auth.service';
import { FriendService } from '../services/friend.service';

@Component({
	selector: 'app-item-friend',
	templateUrl: './item-friend.component.html',
	styleUrls: ['./item-friend.component.scss']
})
export class ItemFriendComponent implements OnInit, AfterViewInit {
	@Input() id = '';
	@Input() isAccept = true;
	@Input() userId2 = '';

	@Output() reloadListFriend = new EventEmitter<string>();

	public friend: FriendSearch | null = null;


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
					}
				}
			}
		);
	}

	acceptFriend() {

		this.friendService.acceptFriend(this.friend?.id!, this.authService.getUser()?.id!).subscribe(
			res => {
				if (res.data && res.data.isAccept) {
					this.reloadListFriend.emit('complete');
				}
			}
		);
	}

}
