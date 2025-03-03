import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandTerminalComponent } from './command-terminal.component';

describe('CommandTerminalComponent', () => {
  let component: CommandTerminalComponent;
  let fixture: ComponentFixture<CommandTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandTerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
