import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service'

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

	constructor( private http: Http,
		private processHttpmsgService: ProcessHttpmsgService,
		private restangular: Restangular) { }
	
	getPromotions(): Observable<Promotion[]> {
		return this.restangular.all('promotions').getList();
	}

	getPromotion(id: number): Observable<Promotion> {
		return this.restangular.one('promotions', id).get();
	}

	getFeaturedPromotion(): Observable<Promotion> {
		return this.restangular.all('promotions').getList({featured: true})
			.map(promotions => promotions[0]);
	}
} 
