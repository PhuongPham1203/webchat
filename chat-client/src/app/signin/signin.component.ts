import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
	}



	signIn() {
		if (this.formGroup.valid) {
			this.isSubmit = true;
			this.authService.sighIn(this.formGroup.get('username')?.value, this.formGroup.get('password')?.value)
				.subscribe(
					data => {
						if (data.error == false) {
							//console.log(data);
							if (data == null) {
								alert("Username or Password is incorrect !");
								this.isSubmit = false;
							} else {
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
				)

		}

	}

}
