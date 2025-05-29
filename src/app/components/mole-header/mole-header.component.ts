import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mole-header',
  standalone: true,
  imports: [TranslateModule], 
  templateUrl: './mole-header.component.html',
  styleUrl: './mole-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleHeaderComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) running!: boolean;
  
  @Output() readonly backHome = new EventEmitter<void>();
  @Output() readonly playToggle = new EventEmitter<void>();

  get playIcon(): string  { return this.running ? 'assets/icons/pause.png' : 'assets/icons/play.png'; }
  get playAlt(): string   { return this.running ? 'pause' : 'play'; }


  onToggle(): void { 
    this.playToggle.emit();
  }

  onBackHome(): void {
    this.backHome.emit();
  }
}
