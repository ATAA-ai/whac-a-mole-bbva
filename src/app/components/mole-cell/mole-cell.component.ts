import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mole-cell',
  standalone: true,
  templateUrl: './mole-cell.component.html',
  styleUrl: './mole-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleCellComponent {
  @Input({ required: true }) index!: number;
  @Input() active = false;
  @Output() readonly hit = new EventEmitter<number>();

  emitHit(): void {
    this.hit.emit(this.index);
  }
}