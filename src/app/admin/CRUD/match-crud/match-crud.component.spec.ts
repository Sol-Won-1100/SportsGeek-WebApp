import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCRUDComponent } from './match-crud.component';

describe('MatchCRUDComponent', () => {
  let component: MatchCRUDComponent;
  let fixture: ComponentFixture<MatchCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
