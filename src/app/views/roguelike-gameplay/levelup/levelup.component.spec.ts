import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelupComponent } from './levelup.component';

describe('LevelupComponent', () => {
  let component: LevelupComponent;
  let fixture: ComponentFixture<LevelupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
