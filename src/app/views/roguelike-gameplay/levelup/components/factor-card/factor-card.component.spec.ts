import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorCardComponent } from './factor-card.component';

describe('FactorCardComponent', () => {
  let component: FactorCardComponent;
  let fixture: ComponentFixture<FactorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
