import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageOldMatchesComponent } from './admin-manage-old-matches.component';

describe('AdminManageOldMatchesComponent', () => {
  let component: AdminManageOldMatchesComponent;
  let fixture: ComponentFixture<AdminManageOldMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageOldMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageOldMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
