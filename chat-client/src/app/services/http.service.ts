import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	private host = "localhost:3000/";

	constructor(private http: HttpClient) { }

	public post(url: string, data: any) {
		return this.http.post<any>(this.host + url, data);
	}

	public get(url: string) {
		return this.http.get<any>(this.host + url);
	}

}

