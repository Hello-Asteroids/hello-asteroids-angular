import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoguelikeGameplayComponent } from './roguelike-gameplay.component';

describe('RoguelikeGameplayComponent', () => {
  let component: RoguelikeGameplayComponent;
  let fixture: ComponentFixture<RoguelikeGameplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoguelikeGameplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoguelikeGameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
