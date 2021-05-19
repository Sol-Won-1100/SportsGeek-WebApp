import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatchResultComponent } from './update-match-result.component';

describe('UpdateMatchResultComponent', () => {
  let component: UpdateMatchResultComponent;
  let fixture: ComponentFixture<UpdateMatchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMatchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
