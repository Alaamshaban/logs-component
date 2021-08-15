import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsBodyComponent } from './logs-body.component';

describe('LogsBodyComponent', () => {
  let component: LogsBodyComponent;
  let fixture: ComponentFixture<LogsBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
