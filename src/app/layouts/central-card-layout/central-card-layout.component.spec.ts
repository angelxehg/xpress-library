import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralCardLayoutComponent } from './central-card-layout.component';

describe('CentralCardLayoutComponent', () => {
  let component: CentralCardLayoutComponent;
  let fixture: ComponentFixture<CentralCardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralCardLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralCardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
