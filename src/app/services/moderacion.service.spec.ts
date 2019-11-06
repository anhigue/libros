import { TestBed } from '@angular/core/testing';

import { ModeracionService } from './moderacion.service';

describe('ModeracionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeracionService = TestBed.get(ModeracionService);
    expect(service).toBeTruthy();
  });
});
