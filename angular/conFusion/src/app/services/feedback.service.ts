import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Feedback } from '../shared/feedback';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class FeedbackService {

	constructor(private restangular: Restangular) { }

	submitFeedback(feedback: Feedback): Observable<Feedback>{
		return this.restangular.all('feedback').post(feedback);
	}

}
