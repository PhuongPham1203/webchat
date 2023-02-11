export interface FriendChat {
	id: string,
	username: string,
	name: string,
	avataUrl: string,
	roomId: string
}

export interface RoomSetting {
	userId1: string,
	userId2: string,
	roomId: string,
	publicKey: string,
	commonKey: string
}

export interface MessageChat {
	userId1: string,
	userId2: string,
	message: string,
	timeCreate: Date,
	avataUrl?: string,
	roomId?: string
}


