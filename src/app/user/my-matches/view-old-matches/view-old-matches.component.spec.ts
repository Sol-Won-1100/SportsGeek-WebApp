import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOldMatchesComponent } from './view-old-matches.component';

describe('ViewOldMatchesComponent', () => {
  let component: ViewOldMatchesComponent;
  let fixture: ComponentFixture<ViewOldMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOldMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOldMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
