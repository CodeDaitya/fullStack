import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
	styleUrls: ['./dishdetail.component.scss']
	animations: [
		trigger('visibility', [
			state('shown', style({
				transform: 'scale(1.0)',
				opacity: 1
			})),
			state('hidden', style({
				transform: 'scale(0.5)',
				opacity: 0
			})),
			transition('* => *', animate('0.5s ease-in-out'))
		])
	]
})
export class DishdetailComponent implements OnInit {

	dish : Dish;
	dishCopy = null;
	dishIds: number[];
	prev: number;
	next: number;
	commentForm: FormGroup;
	comment: Comment;
	errMess: string;
	visibility = 'shown';

	formErrors = {
		'author': '',
		'comment': '',
	};

	validationMessages = {
		'author': {
			'required': 'Author name is required',
			'minlength': 'Author name should be at least 2 characters long',
			'maxlength': 'Author name cannot exceed 30 characters'
		},
		'comment': {
			'required': 'Comment is required'
		},
	};

	constructor(private dishservice: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL')private BaseURL) {
			this.createForm();
		}

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']);})
			.subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'},
				errmess => this.errMess = <any>errmess );
	}

	createForm() {
		this.commentForm = this.fb.group({
			author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
			rating: 5,
			comment: ['', Validators.required],
		});

		this.commentForm.valueChanges
			.subscribe(data => this.onValueChanges(data));

		this.onValueChanges();
	}

	onValueChanges(data?: any) {
		if(!this.commentForm) {
			return;
		}

		const form = this.commentForm;
		for(const field in this.formErrors) {
			this.formErrors[field] = '';
			const control = form.get(field);
			if(control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for(const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	onSubmit() {
		this.comment = this.commentForm.value;
		console.log(this.comment);
		this.comment.date = (new Date).toISOString();
		this.dishCopy.comments.push(this.comment);
		this.dishCopy.save().subscribe(dish => this.dish = dish);
		this.commentForm.reset({
			author: '',
			rating: 5,
			comment: ''
		});
	}

	goBack(): void {
		this.location.back();
	}

	setPrevNext(dishId) {
		let index = this.dishIds.indexOf(dishId);
		this.prev = this.dishIds[(index-1)];
		this.next = this.dishIds[(index+1)];
	}



}
