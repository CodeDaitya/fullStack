import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Response } from '@angular/http';

@Injectable()
export class ProcessHttpmsgService {

	constructor() { }
	
	public extractData(res: Response) {
		let body = res.json();
		console.log(body);
		return body ? body : {};
	}

}
