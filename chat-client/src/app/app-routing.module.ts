import { FriendsComponent } from './friends/friends.component';
import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { SignupComponent } from './signup/signup.component';
import { ChatsComponent } from './chats/chats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignoutComponent } from './signout/signout.component';

const routes: Routes = [
	{ path: '', redirectTo: 'chats', pathMatch: 'full' },
	{ path: 'signin', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signout', component: SignoutComponent },
	{ path: 'chats', component: ChatsComponent, canActivate: [AuthGuardGuard] },
	{ path: 'friends', component: FriendsComponent, canActivate: [AuthGuardGuard] },
	{ path: '**', component: PageNotFoundComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
