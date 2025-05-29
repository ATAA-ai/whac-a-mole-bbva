import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleGridComponent } from './mole-grid.component';

describe('MoleGridComponent', () => {
  let component: MoleGridComponent;
  let fixture: ComponentFixture<MoleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
