import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarComponent } from './comentar.component';

describe('ComentarComponent', () => {
  let component: ComentarComponent;
  let fixture: ComponentFixture<ComentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
