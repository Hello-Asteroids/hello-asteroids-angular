import { TestBed } from '@angular/core/testing';

import { GameWorldService } from './game-world.service';

describe('GameWorldService', () => {
  let service: GameWorldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameWorldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
