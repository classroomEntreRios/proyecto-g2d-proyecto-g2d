import { TestBed } from '@angular/core/testing';

import { AtraccionesService } from './atracciones.service';

describe('AtraccionesService', () => {
  let service: AtraccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtraccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
