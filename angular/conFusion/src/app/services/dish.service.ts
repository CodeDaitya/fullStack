import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class DishService {

	constructor(private http: Http,
		private processHttpmsgService: ProcessHttpmsgService,
		private restangular: Restangular) { }

	getDishes(): Observable<Dish[]> {
		return this.restangular.all('dishes').getList();
	}

	getDish(id: number): Observable<Dish> {
		return this.restangular.one('dishes', id).get();
	}

	getFeaturedDish(): Observable<Dish> {
		return this.restangular.all('dishes').getList({featured: true})
			.map(dishes => dishes[0]);
	}

	getDishIds(): Observable<number[]> {
		return this.getDishes()
			.map(dishes => { return dishes.map(dish => dish.id); })
			.catch(error => { return this.processHttpmsgService.handleError(error); });
	}
}
