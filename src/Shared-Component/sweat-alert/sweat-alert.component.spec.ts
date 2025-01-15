import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweatAlertComponent } from './sweat-alert.component';

describe('SweatAlertComponent', () => {
  let component: SweatAlertComponent;
  let fixture: ComponentFixture<SweatAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweatAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweatAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
