import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Difficulty } from './game-config';

const STORAGE_KEY = 'wam-user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  /** Private state with the current user or null */
  private _user = signal<User | null>(this.loadUser());
  /** Read-only version for components */
  readonly user = this._user.asReadonly();

  /**
   * Registers a new player and resets score to 0.
   */
  setUser(name: string, difficulty: Difficulty): void {
    const newUser: User = { name, score: 0, difficulty };
    this._user.set(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  }

  /**
   * Adds `delta` points to the current user (if any).
   */
  updateScore(delta: number): void {
    const current = this._user();
    if (!current) return;
    const updated = { ...current, score: current.score + delta };
    this._user.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  /** Clears stored data and resets service state */
  reset(): void {
    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  /** Loads user from LocalStorage (or null if none) */
  private loadUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }
  
}
