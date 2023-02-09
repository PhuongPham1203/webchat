import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { SignupComponent } from './signup/signup.component';
import { ChatsComponent } from './chats/chats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'sighup', component: SignupComponent },
	{ path: 'chats', component: ChatsComponent, canActivate: [AuthGuardGuard] },
	{ path: '**', component: PageNotFoundComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
