import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAtraccionComponent } from './crear-atraccion.component';

describe('CrearAtraccionComponent', () => {
  let component: CrearAtraccionComponent;
  let fixture: ComponentFixture<CrearAtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAtraccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
