import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAtraccionComponent } from './editar-atraccion.component';

describe('EditarAtraccionComponent', () => {
  let component: EditarAtraccionComponent;
  let fixture: ComponentFixture<EditarAtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAtraccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
