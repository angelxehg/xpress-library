import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
