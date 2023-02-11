import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserSignIn } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

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
			name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
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

	public signUp() {
		if (this.formGroup.valid) {
			this.isSubmit = true;
			this.authService.sighUp(
				this.formGroup.get('name')?.value,
				this.formGroup.get('username')?.value,
				this.formGroup.get('password')?.value
			)
				.subscribe(
					data => {
						if (data.error == false) {
							//console.log(data);
							if (data.data == null) {
								alert("Something went wrong, please try again");
								this.isSubmit = false;
							} else {

								if (data.data.usernameExit == true) {
									alert("Username already exists. Please select another username !");
									this.isSubmit = false;
								} else if (data.data.createSuccess == true) {
									alert("Sign Up Success!");
									this.router.navigateByUrl('signin');
								}

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
