import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavsComponent } from './user-favs.component';

describe('UserFavsComponent', () => {
  let component: UserFavsComponent;
  let fixture: ComponentFixture<UserFavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
