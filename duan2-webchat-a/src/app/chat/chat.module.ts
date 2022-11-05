import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactScreenComponent } from './contact-screen/contact-screen.component';



@NgModule({
  declarations: [
    MainScreenComponent,
    ChatListComponent,
    FriendListComponent,
    ChatBoxComponent,
    ContactScreenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
