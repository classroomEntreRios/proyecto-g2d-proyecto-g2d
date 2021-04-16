import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsHomeComponent } from './cards-home.component';

describe('CardsHomeComponent', () => {
  let component: CardsHomeComponent;
  let fixture: ComponentFixture<CardsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
