import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogueadoComponent } from './logueado.component';

describe('LogueadoComponent', () => {
  let component: LogueadoComponent;
  let fixture: ComponentFixture<LogueadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogueadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogueadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
