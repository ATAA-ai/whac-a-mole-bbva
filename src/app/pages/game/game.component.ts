import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GameEngineService } from '../../services/game-engine.service';
import { Difficulty } from '../../services/game-config';
import { MoleGridComponent } from '../../components/mole-grid/mole-grid.component';
import { MoleHeaderComponent } from '../../components/mole-header/mole-header.component';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { MoleCountdownComponent } from '../../components/mole-countdown/mole-countdown.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MoleHeaderComponent, MoleCountdownComponent, MoleGridComponent, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {

  readonly user = this.userService.user;

  get difficulty(): Difficulty {
    return this.user()!.difficulty;
  }

  readonly running   = this.engine.running;
  readonly moleIndex = this.engine.moleIndex;

  countdownActive = true;

  constructor(
    private userService: UserService,
    private scoreService: ScoreService,
    private engine : GameEngineService,
    private readonly router : Router
  ) {}

  ngOnInit(): void {
    this.countdownActive = true;
  }

  onCountdownFinished(): void {
    this.countdownActive = false;
    this.engine.start(this.difficulty);
  }
  
  /** Play ↔ Stop toggle */
  toggleGame(): void {
    if (this.running()) {
      this.engine.stop();
    } else {
      this.engine.start(this.difficulty);
    }
  }

  /** Receives the clicked cell index from MoleGrid */
  onHit(cell: number): void {
    const gained = this.engine.hit(cell);
    if (gained) this.userService.updateScore(gained);
  }

  /** Called when MoleHeader emits backHome */
  goHome(): void {
    this.saveScore();
    this.engine.stop();
    this.userService.reset();          
    this.router.navigate(['/']);
  }

  /** Called when the user leaves the game */
  private saveScore(): void {
    const u = this.user();
    if (!u) { return; }
    this.scoreService.add({
      name: u.name,
      score: u.score,
      difficulty: u.difficulty,
      date: new Date().toISOString()
    });
  }

  /** Prevent stray intervals when leaving the component */
  ngOnDestroy(): void {
    this.saveScore();
    this.engine.stop();
  }

}
