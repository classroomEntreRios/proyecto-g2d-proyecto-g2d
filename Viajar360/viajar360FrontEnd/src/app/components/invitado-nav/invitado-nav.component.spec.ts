import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoNavComponent } from './invitado-nav.component';

describe('InvitadoNavComponent', () => {
  let component: InvitadoNavComponent;
  let fixture: ComponentFixture<InvitadoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitadoNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitadoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
