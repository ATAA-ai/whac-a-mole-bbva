import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { UserService } from '../../services/user.service';
import { GameEngineService } from '../../services/game-engine.service';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';
import { Difficulty } from '../../services/game-config';
import { TranslateModule } from '@ngx-translate/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let engineSpy: jasmine.SpyObj<GameEngineService>;
  let scoreServiceSpy: jasmine.SpyObj<ScoreService>;
  let routerSpy: jasmine.SpyObj<Router>;

  
beforeEach(async () => {
  userServiceSpy = jasmine.createSpyObj('UserService', ['updateScore', 'reset']);
  engineSpy = jasmine.createSpyObj('GameEngineService', ['start', 'stop', 'hit']);
  scoreServiceSpy = jasmine.createSpyObj('ScoreService', ['add']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  await TestBed.configureTestingModule({
    imports: [
      GameComponent,
      TranslateModule.forRoot()
    ],
    providers: [
      { provide: UserService, useValue: userServiceSpy },
      { provide: GameEngineService, useValue: engineSpy },
      { provide: ScoreService, useValue: scoreServiceSpy },
      { provide: Router, useValue: routerSpy }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(GameComponent);
  component = fixture.componentInstance;

  // Sobrescribir propiedades readonly
  Object.defineProperty(component, 'user', {
    get: () => () => ({
      name: 'TestUser',
      score: 0,
      difficulty: 'medium' as Difficulty
    })
  });

  Object.defineProperty(component, 'running', {
    get: () => () => false
  });

  Object.defineProperty(component, 'moleIndex', {
    get: () => () => 0
  });
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start engine on countdown finish', () => {
    component.onCountdownFinished();
    expect(component.countdownActive).toBeFalse();
    expect(engineSpy.start).toHaveBeenCalledWith('medium');
  });

it('should toggle game state', () => {
  // Simula que el juego está corriendo
  Object.defineProperty(component, 'running', {
    get: () => () => true
  });

  component.toggleGame();
  expect(engineSpy.stop).toHaveBeenCalled();

  // Simula que el juego está detenido
  Object.defineProperty(component, 'running', {
    get: () => () => false
  });

  component.toggleGame();
  expect(engineSpy.start).toHaveBeenCalledWith('medium');
});


  it('should update score on hit', () => {
    engineSpy.hit.and.returnValue(10);
    component.onHit(3);
    expect(userServiceSpy.updateScore).toHaveBeenCalledWith(10);
  });

  it('should save score and navigate home on goHome', () => {
    component.goHome();
    expect(scoreServiceSpy.add).toHaveBeenCalled();
    expect(engineSpy.stop).toHaveBeenCalled();
    expect(userServiceSpy.reset).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should save score and stop engine on destroy', () => {
    component.ngOnDestroy();
    expect(scoreServiceSpy.add).toHaveBeenCalled();
    expect(engineSpy.stop).toHaveBeenCalled();
  });
});
