import { TestBed } from '@angular/core/testing';

import { HeatmapDataService } from './heapmap-data.service';

describe('HeapmapDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeatmapDataService = TestBed.get(HeatmapDataService);
    expect(service).toBeTruthy();
  });
});
