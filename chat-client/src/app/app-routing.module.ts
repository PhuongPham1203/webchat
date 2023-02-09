import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { SignupComponent } from './signup/signup.component';
import { ChatsComponent } from './chats/chats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'sighin', pathMatch: 'full' },
	{ path: 'signin', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'chats', component: ChatsComponent, canActivate: [AuthGuardGuard] },
	{ path: '**', component: PageNotFoundComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
