import { Component } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { NgIf, NgFor, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, TitleCasePipe, RouterLink, TranslateModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent {
  readonly scores = this.scoreSrv.scores;

  constructor(private readonly scoreSrv: ScoreService) {}
}
