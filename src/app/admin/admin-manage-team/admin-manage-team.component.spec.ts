import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageTeamComponent } from './admin-manage-team.component';

describe('AdminManageTeamComponent', () => {
  let component: AdminManageTeamComponent;
  let fixture: ComponentFixture<AdminManageTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
