import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPanelComponent } from './stat-panel.component';

describe('StatPanelComponent', () => {
  let component: StatPanelComponent;
  let fixture: ComponentFixture<StatPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
