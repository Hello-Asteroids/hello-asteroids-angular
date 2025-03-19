import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesCounterComponent } from './lives-counter.component';

describe('LivesCounterComponent', () => {
  let component: LivesCounterComponent;
  let fixture: ComponentFixture<LivesCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivesCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
