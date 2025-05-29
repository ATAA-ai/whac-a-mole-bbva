import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleCountdownComponent } from './mole-countdown.component';

describe('MoleCountdownComponent', () => {
  let component: MoleCountdownComponent;
  let fixture: ComponentFixture<MoleCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleCountdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoleCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
