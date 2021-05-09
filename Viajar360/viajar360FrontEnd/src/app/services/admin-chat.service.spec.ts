import { TestBed } from '@angular/core/testing';

import { AdminChatService } from './admin-chat.service';

describe('AdminChatService', () => {
  let service: AdminChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
