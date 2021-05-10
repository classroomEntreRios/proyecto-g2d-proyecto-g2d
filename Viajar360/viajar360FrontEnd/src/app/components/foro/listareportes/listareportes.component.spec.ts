import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListareportesComponent } from './listareportes.component';

describe('ListareportesComponent', () => {
  let component: ListareportesComponent;
  let fixture: ComponentFixture<ListareportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListareportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListareportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
