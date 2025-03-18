import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicGameplayComponent } from './classic-gameplay.component';

describe('ClassicGameplayComponent', () => {
  let component: ClassicGameplayComponent;
  let fixture: ComponentFixture<ClassicGameplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicGameplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicGameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
