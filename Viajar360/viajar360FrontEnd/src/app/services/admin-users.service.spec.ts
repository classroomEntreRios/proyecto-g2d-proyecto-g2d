import { TestBed } from '@angular/core/testing';

import { AdminUsersService } from './admin-users.service';

describe('AdminUsersService', () => {
  let service: AdminUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
