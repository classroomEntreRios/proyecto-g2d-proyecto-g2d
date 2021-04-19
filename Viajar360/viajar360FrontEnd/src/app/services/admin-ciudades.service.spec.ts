import { TestBed } from '@angular/core/testing';

import { AdminCiudadesService } from './admin-ciudades.service';

describe('AdminCiudadesService', () => {
  let service: AdminCiudadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCiudadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
