export interface FriendSearch {
	id: string,
	username: string,
	name: string,
	avataUrl: string
}

export interface Friend {
	id: string,
	username: string,
	name: string,
	avataUrl: string,
	userId1: string,
	userId2: string,
	isAcceptFriend: number,
}