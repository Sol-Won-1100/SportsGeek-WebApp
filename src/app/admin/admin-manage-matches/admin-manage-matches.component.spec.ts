import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageMatchesComponent } from './admin-manage-matches.component';

describe('AdminManageMatchesComponent', () => {
  let component: AdminManageMatchesComponent;
  let fixture: ComponentFixture<AdminManageMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
