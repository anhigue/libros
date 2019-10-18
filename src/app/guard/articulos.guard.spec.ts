import { TestBed, async, inject } from '@angular/core/testing';

import { ArticulosGuard } from './articulos.guard';

describe('ArticulosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticulosGuard]
    });
  });

  it('should ...', inject([ArticulosGuard], (guard: ArticulosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
