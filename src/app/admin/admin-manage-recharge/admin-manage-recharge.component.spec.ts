import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageRechargeComponent } from './admin-manage-recharge.component';

describe('AdminManageRechargeComponent', () => {
  let component: AdminManageRechargeComponent;
  let fixture: ComponentFixture<AdminManageRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
