import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOthersUserProfileComponent } from './view-others-user-profile.component';

describe('ViewOthersUserProfileComponent', () => {
  let component: ViewOthersUserProfileComponent;
  let fixture: ComponentFixture<ViewOthersUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOthersUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOthersUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
