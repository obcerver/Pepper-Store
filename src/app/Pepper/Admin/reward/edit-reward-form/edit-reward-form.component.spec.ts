import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRewardFormComponent } from './edit-reward-form.component';

describe('EditRewardFormComponent', () => {
  let component: EditRewardFormComponent;
  let fixture: ComponentFixture<EditRewardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRewardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRewardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
