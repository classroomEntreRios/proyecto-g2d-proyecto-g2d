import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistradoNavComponent } from './registrado-nav.component';

describe('RegistradoNavComponent', () => {
  let component: RegistradoNavComponent;
  let fixture: ComponentFixture<RegistradoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistradoNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
