import { Injectable, signal } from '@angular/core';
import { CELLS_COUNT, Difficulty, GAME_CONFIG } from './game-config';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  private previousNumber: number | undefined;

  /** Identifier returned by setInterval so it can be cleared later */
  private timerId: ReturnType<typeof setInterval> | null = null;

  /** Reactive flag: true = the loop is running */
  private _running   = signal(false);
  /** Reactive state: index of the cell that shows the mole */
  private _moleIndex = signal<number | null>(null);

  /** Public read-only API for components */
  readonly running   = this._running.asReadonly();
  readonly moleIndex = this._moleIndex.asReadonly();

  private currentDifficulty: Difficulty = 'easy';

  /**
   * Starts the interval that “moves” the mole around the grid.
   * @param diff Difficulty chosen by the player.
   */
  start(diff: Difficulty = 'easy'): void {
    this.stop();                        // Ensure no previous loop is alive
    this.currentDifficulty = diff;
    this._running.set(true);

    const { interval } = GAME_CONFIG[diff];
    this.timerId = setInterval(() => {
      const next = this.pickRandomIndex(this.previousNumber);
      this.previousNumber = next;
      this._moleIndex.set(next);
    }, interval);
  }

  /**
   * Stops the interval and clears the grid.
   */
  stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this._running.set(false);
    this._moleIndex.set(null);
  }

  /**
   * Called when the user clicks on a cell.
   * @param cell Index of the clicked cell (0..8)
   * @returns Points earned (0 if miss).
   */
  hit(cell: number): number {
    if (cell === this._moleIndex()) {
      const gained = GAME_CONFIG[this.currentDifficulty].points;
      // Make the mole disappear until the next tick.
      this._moleIndex.set(null);
      return gained;
    }
    return 0;
  }

  /**
   * Picks a random index in range [0, CELLS_COUNT),
   * ensuring it differs from `exclude`.
   */
  private pickRandomIndex(exclude: number | undefined): number {

    if (exclude === undefined || exclude < 0 || exclude >= CELLS_COUNT) {
      return Math.floor(Math.random() * CELLS_COUNT);
    }

    let rnd = Math.floor(Math.random() * (CELLS_COUNT - 1));
    if (rnd >= exclude) { rnd += 1; }
    return rnd;
  }

}
