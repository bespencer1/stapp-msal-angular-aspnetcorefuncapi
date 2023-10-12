import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginerrorComponent } from './loginerror.component';

describe('LoginerrorComponent', () => {
  let component: LoginerrorComponent;
  let fixture: ComponentFixture<LoginerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoginerrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
