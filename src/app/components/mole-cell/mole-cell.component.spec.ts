import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoleCellComponent } from './mole-cell.component';

describe('MoleCellComponent', () => {
  let component: MoleCellComponent;
  let fixture: ComponentFixture<MoleCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleCellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleCellComponent);
    component = fixture.componentInstance;
    component.index = 0;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have "active" as false by default', () => {
    expect(component.active).toBeFalse();
  });

  it('emitHit() should emit the "hit" event with the correct index', () => {
    spyOn(component.hit, 'emit');
    component.index = 3;
    component.emitHit();
    expect(component.hit.emit).toHaveBeenCalledWith(3);
  });
});
