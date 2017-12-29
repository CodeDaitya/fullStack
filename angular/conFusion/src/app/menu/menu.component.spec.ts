import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Observable } from 'rxjs/Observable';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { DishService } from '../services/dish.service';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {

		let dishServiceStub = {
			getDishes: function(): Observable<Dish[]> {
				return Observable.of(DISHES);
			}
		}

    TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				MaterialModule,
				FlexLayoutModule,
				RouterTestingModule.withRoutes([{path: 'menu', component: MenuComponent}])
			],
			declarations: [ MenuComponent ],
			providers: [
				{ providers: DishService, useValue: dishServiceStub },
				{ providers: 'BaseURL', useValue: baseURL }
			]
    })
		.compileComponents();
		
		let dishservice = TestBed.get(DishService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
	});
	
	it('dishes items should be 4', () => {
		expect(component.dishes.length).toBe(4);
		expect(component.dishes[1].name).toBe('Zuchhipakoda');
		expect(component.dishes[3].featured).toBeFalsy();
	})

	it('should use dishes in the template', () => {
    fixture.detectChanges();

    let de:      DebugElement;
    let el:      HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    
    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());

	});
	
});
