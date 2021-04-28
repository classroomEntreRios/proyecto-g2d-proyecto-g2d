import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreartemaComponent } from './creartema.component';

describe('CreartemaComponent', () => {
  let component: CreartemaComponent;
  let fixture: ComponentFixture<CreartemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreartemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreartemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
