import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsrComponent } from './listar-usr.component';

describe('ListarUsrComponent', () => {
  let component: ListarUsrComponent;
  let fixture: ComponentFixture<ListarUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
