import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from './services/chat/chat.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	@ViewChild('popup', { static: false }) popup: any;

	public roomId: string = "";
	public messageText: string = "";
	public messageArray: {
		user: string,
		message: string
	}[] = [];

	public phone: string = "";
	public currentUser: any;
	public selectedUser: any;

	public userList = [
		{
			id: 1,
			name: 'the Pham ABC',
			phone: '0345652786',
			image: 'assets/images/user_profile/1.svg',
			roomId: {
				2: 'room-1',
				3: 'room-2',
				4: 'room-3',
			}
		},
		{
			id: 2,
			name: 'the Kun',
			phone: '0345652787',
			image: 'assets/images/user_profile/2.svg',
			roomId: {
				1: 'room-1',
				3: 'room-4',
				4: 'room-5',
			}
		},
		{
			id: 3,
			name: 'the Huynh',
			phone: '0345652788',
			image: 'assets/images/user_profile/3.svg',
			roomId: {
				1: 'room-2',
				2: 'room-4',
				4: 'room-6',
			}
		},
		{
			id: 4,
			name: 'the Hoang',
			phone: '0345652789',
			image: 'assets/images/user_profile/4.svg',
			roomId: {
				1: 'room-3',
				2: 'room-5',
				3: 'room-6',
			}
		}
	];

	public showScreen: boolean = false;
	private storageArray: any[] = [];

	constructor(
		private chatService: ChatService,
		private modalService: NgbModal
	) {

	}

	ngOnInit(): void {
		this.chatService.getMessage()
			.subscribe((data: { user: string, room: string, message: string }) => {
				// this.messageArray.push(data);
				if (this.roomId) {
					setTimeout(() => {
						this.storageArray = this.chatService.getStorage();
						const storeIndex = this.storageArray
							.findIndex((storage) => storage.roomId === this.roomId);
						this.messageArray = this.storageArray[storeIndex].chats;
					}, 500);
				}
			});
	}

	ngAfterViewInit(): void {
		this.openPopup(this.popup);
	}

	openPopup(content: any): void {
		this.modalService.open(content, { backdrop: 'static', centered: true });
	}

	login(dismiss: any): void {
		this.currentUser = this.userList.find(user => user.phone == this.phone.toString().toLowerCase());
		this.userList = this.userList.filter((user) => user.phone != this.phone.toString().toLowerCase());
		console.log(this.phone)
		console.log(this.currentUser)
		if (this.currentUser) {
			this.showScreen = true;
			dismiss();
		}
	}

	selectUserHandler(phone: string): void {
		this.selectedUser = this.userList.find(user => user.phone === phone);
		this.roomId = this.selectedUser.roomId[this.currentUser.id];
		this.messageArray = [];

		this.storageArray = this.chatService.getStorage();
		const storeIndex = this.storageArray
			.findIndex((storage) => storage.roomId === this.roomId);

		if (storeIndex > -1) {
			this.messageArray = this.storageArray[storeIndex].chats;
		}

		this.join(this.currentUser.name, this.roomId);
	}

	join(username: string, roomId: string): void {
		this.chatService.joinRoom({ user: username, room: roomId });
	}

	sendMessage(): void {
		this.chatService.sendMessage({
			user: this.currentUser.name,
			room: this.roomId,
			message: this.messageText
		});

		this.storageArray = this.chatService.getStorage();
		const storeIndex = this.storageArray
			.findIndex((storage) => storage.roomId === this.roomId);

		if (storeIndex > -1) {
			this.storageArray[storeIndex].chats.push({
				user: this.currentUser.name,
				message: this.messageText
			});
		} else {
			const updateStorage = {
				roomId: this.roomId,
				chats: [{
					user: this.currentUser.name,
					message: this.messageText
				}]
			};

			this.storageArray.push(updateStorage);
		}

		this.chatService.setStorage(this.storageArray);
		this.messageText = '';
	}
}
