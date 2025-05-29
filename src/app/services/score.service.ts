import { Injectable, signal } from '@angular/core';
import { Difficulty } from './game-config';

export interface ScoreEntry {
  readonly name: string;
  readonly score: number;
  readonly difficulty: Difficulty;
  readonly date: string; 
}

const STORAGE_KEY = 'wam-scores';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  private readonly _scores = signal<ScoreEntry[]>(this.loadScores());
  readonly scores          = this._scores.asReadonly();

  /** Adds a new entry and persists */
  add(entry: ScoreEntry): void {
    const next = [...this._scores(), entry]
      .sort((a, b) => b.score - a.score)      // highest first
      .slice(0, 20);                          // keep top-20

    this._scores.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  clear(): void {
    this._scores.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadScores(): ScoreEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as ScoreEntry[] : [];
  }
}
