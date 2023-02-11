import { UserSignIn } from './../models/user.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

	public formGroup: FormGroup | any;
	public isSubmit: boolean = false;
	constructor(
		public authService: AuthService,
		private router: Router,
		private cookieService: CookieService
	) {

	}


	ngOnInit(): void {
		this.initFormGroup();
	}

	initFormGroup() {
		this.formGroup = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
			password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
		});
	}

	ngAfterViewInit(): void {
		if (this.cookieService.check('token')) {
			this.authService.sighInWithToken(this.cookieService.get('token'))
				.subscribe(
					data => {
						if (data.error == false) {
							//console.log(data);
							if (data.data != null) {
								let user: UserSignIn = {
									id:data.data.id,
									username: data.data.username,
									name: data.data.name,
									privateKey: data.data.privateKey,
									token: data.data.token,
									avataUrl: data.data.avataUrl
								}
								this.authService.setUser(user);
								this.router.navigateByUrl('chats');
							}
						}
					}
				);
		}
	}

	signIn() {
		if (this.formGroup.valid) {
			this.isSubmit = true;
			this.authService.sighIn(this.formGroup.get('username')?.value, this.formGroup.get('password')?.value)
				.subscribe(
					data => {
						if (data.error == false) {
							//console.log(data);
							if (data.data == null) {
								alert("Username or Password is incorrect !");
								this.isSubmit = false;
							} else {

								let user: UserSignIn = {
									id:data.data.id,
									username: data.data.username,
									name: data.data.name,
									privateKey: data.data.privateKey,
									token: data.data.token,
									avataUrl: data.data.avataUrl
								}

								this.cookieService.set('token', data.data.token, 60);
								this.authService.setUser(user);
								this.router.navigateByUrl('chats');

							}
						} else {
							this.isSubmit = false;
						}
					},
					error => {
						this.isSubmit = false;
						alert("Something went wrong, please try again");
					}
				);

		}

	}

}
