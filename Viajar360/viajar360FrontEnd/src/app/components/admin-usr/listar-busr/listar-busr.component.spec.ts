import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBUsrComponent } from './listar-busr.component';

describe('ListarBUsrComponent', () => {
  let component: ListarBUsrComponent;
  let fixture: ComponentFixture<ListarBUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarBUsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
