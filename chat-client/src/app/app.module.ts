import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { ChatsComponent } from './chats/chats.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { SigninComponent } from './signin/signin.component';
import { CookieService } from 'ngx-cookie-service';
import { SignoutComponent } from './signout/signout.component';
import { AuthService } from './services/auth.service';
import { FriendsComponent } from './friends/friends.component';
import { ItemFriendComponent } from './item-friend/item-friend.component';
import { FriendChatComponent } from './friend-chat/friend-chat.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		ChatsComponent,
		PageNotFoundComponent,
		LeftBarComponent,
		SigninComponent,
		SignoutComponent,
  FriendsComponent,
  ItemFriendComponent,
  FriendChatComponent,
  ChatboxComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule,

	],
	providers: [CookieService, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
