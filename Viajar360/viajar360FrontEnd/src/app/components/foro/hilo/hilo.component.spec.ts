import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiloComponent } from './hilo.component';

describe('HiloComponent', () => {
  let component: HiloComponent;
  let fixture: ComponentFixture<HiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
