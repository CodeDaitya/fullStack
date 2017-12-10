import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

	constructor() { }
	
	getPromotions(): Promise<Promotion[]> {
		return Observable.of(PROMOTIONS).delay(2000).toPromise();
	}

	getPromotion(id: number): Promise<Promotion> {
		return Observable.of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).delay(2000).toPromise();
	}

	getFeaturedPromotion(): Promise<Promotion> {
		return Observable.of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).delay(2000).toPromise();
	}
}
