import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {

	constructor() { }
	
	getLeaders(): Promise<Leader[]> {
		return Observable.of(LEADERS).delay(2000).toPromise();
	}

	getLeader(id: number): Promise<Leader> {
		return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000).toPromise();
	}

	getFeaturedLeader(): Promise<Leader> {
		return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000).toPromise();
	}
}
 