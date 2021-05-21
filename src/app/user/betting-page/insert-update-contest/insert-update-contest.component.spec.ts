import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateContestComponent } from './insert-update-contest.component';

describe('InsertUpdateContestComponent', () => {
  let component: InsertUpdateContestComponent;
  let fixture: ComponentFixture<InsertUpdateContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateContestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertUpdateContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
