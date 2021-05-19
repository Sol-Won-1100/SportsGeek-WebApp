import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingPageComponent } from './betting-page.component';

describe('BettingPageComponent', () => {
  let component: BettingPageComponent;
  let fixture: ComponentFixture<BettingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BettingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
