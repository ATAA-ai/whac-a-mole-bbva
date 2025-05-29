import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { ScoresComponent } from './pages/scores/scores.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: 'scores',   component: ScoresComponent },
  { path: '**', redirectTo: '' }
];
