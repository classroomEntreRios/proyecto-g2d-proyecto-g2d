import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtraccionComponent } from './listar-atraccion.component';

describe('ListarAtraccionComponent', () => {
  let component: ListarAtraccionComponent;
  let fixture: ComponentFixture<ListarAtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtraccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
