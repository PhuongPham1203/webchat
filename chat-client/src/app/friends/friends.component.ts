import { Friend } from './../models/friend.model';
import { FriendService } from './../services/friend.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { FriendSearch } from '../models/friend.model';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, AfterViewInit {

	public formGroup: FormGroup | any;

	public searchResult: FriendSearch | null = null;
	public listAllFriend: Friend[] = [];

	constructor(
		public authService: AuthService,
		private router: Router,
		private cookieService: CookieService,
		private friendService: FriendService,
	) {

	}


	ngOnInit(): void {
		this.initFormGroup();
	}

	initFormGroup() {
		this.formGroup = new FormGroup({
			username: new FormControl('', [Validators.required]),
		});
	}

	ngAfterViewInit(): void {
		this.getListFriend();
	}

	onChangeSearchUser() {
		this.searchResult = null;
		if (this.formGroup.get('username')?.value == "") {
			this.getListFriend();
		} else {
			this.listAllFriend = [];
		}

	}

	searchUsername() {
		if (this.formGroup.valid) {
			this.friendService.searchFriend(this.formGroup.get('username')?.value, this.authService.getUser()?.id!).subscribe(
				res => {
					if (res.data) {
						//console.log(res.data);
						this.searchResult = {
							id: res.data.id,
							name: res.data.name,
							username: res.data.username,
							avataUrl: res.data.avataUrl,
						}
					}
				},
				error => {

				}
			);
		}
	}

	getListFriend() {
		this.friendService.getListFriend(this.authService.getUser()?.id!).subscribe(
			res => {
				if (res.data) {
					this.listAllFriend = res.data;
					//console.log(this.listAllFriend);
				}
			}
		);
	}

	addFriend() {
		this.friendService.addFriend(this.authService.getUser()?.id!, this.searchResult?.id!).subscribe(
			res => {
				if (res.data && res.data.isSend) {
					this.searchResult = null;
					this.getListFriend();
					this.formGroup.get('username')?.setValue("");
				}
			}
		);
	}
}
