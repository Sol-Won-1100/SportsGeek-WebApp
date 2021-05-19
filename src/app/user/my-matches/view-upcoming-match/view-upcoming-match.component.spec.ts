import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpcomingMatchComponent } from './view-upcoming-match.component';

describe('ViewUpcomingMatchComponent', () => {
  let component: ViewUpcomingMatchComponent;
  let fixture: ComponentFixture<ViewUpcomingMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUpcomingMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUpcomingMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
