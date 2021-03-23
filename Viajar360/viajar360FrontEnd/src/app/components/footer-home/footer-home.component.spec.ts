import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHomeComponent } from './footer-home.component';

describe('FooterHomeComponent', () => {
  let component: FooterHomeComponent;
  let fixture: ComponentFixture<FooterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
