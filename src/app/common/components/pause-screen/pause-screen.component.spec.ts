import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseScreenComponent } from './pause-screen.component';

describe('PauseScreenComponent', () => {
  let component: PauseScreenComponent;
  let fixture: ComponentFixture<PauseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PauseScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
