import { ChatService } from './../services/chat.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FriendChat, MessageChat, RoomSetting } from '../models/chat.model';
import { AuthService } from '../services/auth.service';
import { FriendService } from '../services/friend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Subscriber } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import * as shajs from 'sha.js';

@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html',
	styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, AfterViewInit {

	@Input() idFriend = '';
	@ViewChild("chatFinished") chatFinished?: ElementRef;

	public formGroup: FormGroup | any;

	public friend: FriendChat | null = null;

	public settingRoom!: RoomSetting;

	public messageList: MessageChat[] = [];

	public subGetNewMessage?: Subscription;
	public subGetListChat?: Subscription;
	public subChatWithFriend?: Subscription;

	constructor(
		public authService: AuthService,
		private router: Router,
		private cookieService: CookieService,
		private friendService: FriendService,
		private chatService: ChatService,
	) { }

	ngOnInit(): void {
		this.initFormGroup();


	}

	initFormGroup() {
		this.formGroup = new FormGroup({
			messageInput: new FormControl('', [Validators.required]),
		});
	}

	ngAfterViewInit(): void {
		//this.reloadPage();
	}

	reloadPage(id: string = "") {

		if (this.subGetNewMessage) {
			this.subGetNewMessage.unsubscribe();
		}

		if (this.subGetListChat) {
			this.subGetListChat.unsubscribe();
		}

		if (this.subChatWithFriend) {
			this.subChatWithFriend.unsubscribe();
		}

		// join room
		let useID = this.idFriend;
		if (id) {
			useID = id;
		}
		this.subChatWithFriend = this.friendService.getFriendById(useID, this.authService.getUser()?.id + "").subscribe(
			res => {
				if (res.data) {
					this.friend = {
						id: res.data.id,
						name: res.data.name,
						username: res.data.username,
						avataUrl: res.data.avataUrl,
						roomId: res.data.roomId,
					}

					this.join(this.friend.username, this.friend.roomId);

					// get common key of room
					this.chatService.getPublicKeyOfFriend(this.friend.id + "", this.authService.getUser()?.id + "").subscribe(
						res => {
							if (res.data) {

								let key = res.data.publicKey;
								if (+res.data.userId1 < res.data.userId2) {
									key = this.authService.getUser()?.privateKey + key;
								} else {
									key = key + this.authService.getUser()?.privateKey;
								}

								key = shajs('sha256').update(key).digest('hex');

								this.settingRoom = {
									userId1: res.data.userId1,
									userId2: res.data.userId2,
									roomId: res.data.roomId,
									publicKey: res.data.publicKey,
									commonKey: key
								}

								//console.log(this.settingRoom.commonKey);

								// get list message
								this.subGetListChat = this.chatService.getListMessage(this.friend?.id + "", this.authService.getUser()?.id + "")
									.subscribe(
										res => {
											if (res.data) {
												let listChat : MessageChat[] = res.data;
												listChat.forEach(element => {
													let decryptedMessage = CryptoJS.AES.decrypt(element.message, this.settingRoom.commonKey).toString(CryptoJS.enc.Utf8);
													element.message = decryptedMessage;
												});

												this.messageList = listChat;

												setTimeout(() => {
													this.scrollToEndChat();
												}, 500);

											}
										}
									);

							}
						}
					);



					// subscribe get new message
					this.subGetNewMessage = this.chatService.getNewMessage()
						.subscribe((data) => {
							//console.log(data);
							if (data && (Object.keys(data).length != 0)) {
								//console.log(this.settingRoom.commonKey);
								data.message = CryptoJS.AES.decrypt(data.message, this.settingRoom.commonKey).toString(CryptoJS.enc.Utf8);
								if (!this.messageList.includes(data)) {
									this.messageList.push(data);
									setTimeout(() => {
										this.scrollToEndChat();
									}, 300);
								}

							}

						});

				}
			}
		);
	}

	join(username: string, roomId: string): void {
		this.chatService.joinRoom({ username: username, room: roomId });
	}

	sendMessage() {
		if (this.formGroup.valid) {
			//console.log(this.settingRoom.commonKey);
			let encryptedMessage = CryptoJS.AES.encrypt(this.formGroup.get("messageInput").value, this.settingRoom.commonKey).toString();

			let mess: MessageChat = {
				userId1: this.authService.getUser()?.id + "",
				userId2: this.idFriend + "",
				message: encryptedMessage,
				timeCreate: new Date(),
				roomId: this.friend?.roomId
			}

			this.chatService.sendMessage(mess);
			this.formGroup.get("messageInput").setValue("");
		}
	}

	scrollToEndChat() {
		if (this.chatFinished) {
			this.chatFinished.nativeElement.scrollIntoView({ behavior: "smooth", block: "end", inline: 'nearest' });
		}
	}
}


