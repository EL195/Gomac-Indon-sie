import { TestBed } from '@angular/core/testing';

import { SoldeService } from './solde.service';

describe('SoldeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoldeService = TestBed.get(SoldeService);
    expect(service).toBeTruthy();
  });
});
