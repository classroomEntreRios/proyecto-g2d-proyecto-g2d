import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectdummyComponent } from './redirectdummy.component';

describe('RedirectdummyComponent', () => {
  let component: RedirectdummyComponent;
  let fixture: ComponentFixture<RedirectdummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectdummyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectdummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
