import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCuentaComponent } from './borrar-cuenta.component';

describe('BorrarCuentaComponent', () => {
  let component: BorrarCuentaComponent;
  let fixture: ComponentFixture<BorrarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
