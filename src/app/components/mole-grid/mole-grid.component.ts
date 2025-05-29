import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MoleCellComponent } from '../mole-cell/mole-cell.component';
import { CELLS_COUNT } from '../../services/game-config';

@Component({
  selector: 'app-mole-grid',
  standalone: true,
  imports: [ NgFor, MoleCellComponent ],
  templateUrl: './mole-grid.component.html',
  styleUrl: './mole-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleGridComponent {
  @Input({ required: true }) public activeIndex: number | null = null;
  @Output() public readonly hit = new EventEmitter<number>();

  protected readonly cells: readonly number[] = Array.from({ length: CELLS_COUNT }, (_, i) => i);

  trackByIdx = (_: number, item: number): number => item;
}
