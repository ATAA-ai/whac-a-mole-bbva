import { Difficulty } from "../services/game-config";

export interface User {
  readonly name: string;
  readonly score: number;
  readonly difficulty: Difficulty;
}