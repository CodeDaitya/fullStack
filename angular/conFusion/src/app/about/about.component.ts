import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader'
import { LeaderService } from '../services/leader.service'
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	host: {
		'[@flyInOut]': 'true',
		'style': 'display: block;'
	},
	animations: [
		flyInOut(),
		expand()
	]
})
export class AboutComponent implements OnInit {

	leaders: Leader[];
	errMess: string;

	constructor(private leaderservice: LeaderService,
		@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
		this.leaderservice.getLeaders()
			.subscribe(leader => this.leaders = leader, errmess => this.errMess = errmess );
  }

}
