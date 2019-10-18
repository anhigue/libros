import { TestBed, async, inject } from '@angular/core/testing';

import { CategoriasGuard } from './categorias.guard';

describe('CategoriasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriasGuard]
    });
  });

  it('should ...', inject([CategoriasGuard], (guard: CategoriasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
