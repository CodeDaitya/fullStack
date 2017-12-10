import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

	constructor() { }
	
	getPromotions(): Promise<Promotion[]> {
		return new Promise(resolve => {
			setTimeout(() => resolve(PROMOTIONS), 2000);
		});
	}

	getPromotion(id: number): Promise<Promotion> {
		return new Promise(resolve => {
			setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
		});
	}

	getFeaturedPromotion(): Promise<Promotion> {
		return new Promise(resolve => {
			setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]), 2000);
		});
	}
}
