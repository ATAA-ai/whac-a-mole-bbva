import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleCellComponent } from './mole-cell.component';

describe('MoleCellComponent', () => {
  let component: MoleCellComponent;
  let fixture: ComponentFixture<MoleCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
