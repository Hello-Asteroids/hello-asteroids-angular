import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoonCardComponent } from './boon-card.component';

describe('BoonCardComponent', () => {
  let component: BoonCardComponent;
  let fixture: ComponentFixture<BoonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
