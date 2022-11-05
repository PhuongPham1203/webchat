import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './chat/main-screen/main-screen.component';
import { LoginComponent } from './login/login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'sign-in',
		component: SignInComponent
	},
	{
		path: 'main',
		component: MainScreenComponent
	},
	{
		path: "**",
		component: PageNotFoundComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
