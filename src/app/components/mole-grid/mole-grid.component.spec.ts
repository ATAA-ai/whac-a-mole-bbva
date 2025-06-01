import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoleGridComponent } from './mole-grid.component';
import { MoleCellComponent } from '../mole-cell/mole-cell.component';
import { By } from '@angular/platform-browser';
import { CELLS_COUNT } from '../../services/game-config';

describe('MoleGridComponent', () => {
  let component: MoleGridComponent;
  let fixture: ComponentFixture<MoleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MoleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render ${CELLS_COUNT} mole cells`, () => {
    const cells = fixture.debugElement.queryAll(By.directive(MoleCellComponent));
    expect(cells.length).toBe(CELLS_COUNT);
  });

  it('should emit hit event when a cell is clicked', () => {
    spyOn(component.hit, 'emit');
    const cellIndex = 3;

    // Simular clic en el componente hijo
    const cellComponents = fixture.debugElement.queryAll(By.directive(MoleCellComponent));
    const targetCell = cellComponents[cellIndex].componentInstance as MoleCellComponent;
    targetCell.hit.emit(cellIndex);

    expect(component.hit.emit).toHaveBeenCalledWith(cellIndex);
  });

  it('should use trackByIdx correctly', () => {
    const index = 5;
    const item = 5;
    expect(component.trackByIdx(index, item)).toBe(item);
  });
});
