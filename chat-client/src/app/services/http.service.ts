import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	//private host = "http://localhost:3000/";
	private host = "https://boxboxlux-server.herokuapp.com/";
	

	constructor(private http: HttpClient) { }

	public post(url: string, data: any) {
		const headers = { 'content-type': 'application/json' }
		const body = JSON.stringify(data);
		return this.http.post<any>(this.host + url, data);
	}

	public get(url: string) {
		return this.http.get<any>(this.host + url);
	}

}

