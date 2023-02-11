import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-signout',
	templateUrl: './signout.component.html',
	styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

	constructor(
		public authService: AuthService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.authService.sighout();
		this.router.navigateByUrl('signin');
	}

}
