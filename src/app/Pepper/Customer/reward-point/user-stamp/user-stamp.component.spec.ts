import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStampComponent } from './user-stamp.component';

describe('UserStampComponent', () => {
  let component: UserStampComponent;
  let fixture: ComponentFixture<UserStampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
