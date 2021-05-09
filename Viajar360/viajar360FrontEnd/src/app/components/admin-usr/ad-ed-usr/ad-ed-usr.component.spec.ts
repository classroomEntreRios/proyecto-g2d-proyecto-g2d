import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEdUsrComponent } from './ad-ed-usr.component';

describe('AdEdUsrComponent', () => {
  let component: AdEdUsrComponent;
  let fixture: ComponentFixture<AdEdUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdEdUsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdEdUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
