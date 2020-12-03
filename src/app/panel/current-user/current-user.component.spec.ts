import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, AuthServiceMock } from 'src/app/auth/auth.service';

import { CurrentUserComponent } from './current-user.component';

describe('CurrentUserComponent', () => {
  let component: CurrentUserComponent;
  let fixture: ComponentFixture<CurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentUserComponent],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
