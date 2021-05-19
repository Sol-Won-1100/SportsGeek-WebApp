import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiveMatchesComponent } from './view-live-matches.component';

describe('ViewLiveMatchesComponent', () => {
  let component: ViewLiveMatchesComponent;
  let fixture: ComponentFixture<ViewLiveMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLiveMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLiveMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
