import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Difficulty, DIFFICULTY_LIST } from '../../services/game-config';
import { NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageOption, LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgFor, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  selectedDifficulty: Difficulty = 'easy';
  readonly difficulties = DIFFICULTY_LIST;

  readonly langOptions    = this.languageService.options;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    public readonly languageService: LanguageService,
  ) {}

  /** Called when MoleHeader emits backHome */
  goScores(): void {         
    this.router.navigate(['/scores']);
  }

  /** Proxy to LanguageService */
  setLang(code: LanguageOption['code']): void {
    this.languageService.setLang(code);
  }

  onSubmit(form: NgForm): void {
    this.userService.setUser(form.value.name, this.selectedDifficulty);
    this.router.navigate(['/game']);
  }
}
