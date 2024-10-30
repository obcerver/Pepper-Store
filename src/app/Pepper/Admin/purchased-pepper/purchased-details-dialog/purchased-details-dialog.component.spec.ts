import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedDetailsDialogComponent } from './purchased-details-dialog.component';

describe('PurchasedDetailsDialogComponent', () => {
  let component: PurchasedDetailsDialogComponent;
  let fixture: ComponentFixture<PurchasedDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
