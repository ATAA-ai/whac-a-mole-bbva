import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  signal,
  Signal,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-mole-countdown',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mole-countdown.component.html',
  styleUrls: ['./mole-countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleCountdownComponent implements OnInit, OnDestroy {
  /** How many seconds to count down from (inclusive) */
  @Input() start = 3;
  /** Emits when countdown reaches zero */
  @Output() finished = new EventEmitter<void>();

  /** Current visible value or null when done */
  private _count = signal<number|null>(null);
  readonly count: Signal<number|null> = this._count.asReadonly();

  private timeouts: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    // Schedule each tick at 0s, 1s, 2s… up to `start`
    for (let i = this.start; i >= 0; i--) {
      const t = setTimeout(() => {
        if (i > 0) {
          this._count.set(i);
        } else {
          this._count.set(null);
          this.finished.emit();
        }
      }, (this.start - i) * 1000);
      this.timeouts.push(t);
    }
  }

  ngOnDestroy(): void {
    // Clean up if destroyed early
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];
  }
}
