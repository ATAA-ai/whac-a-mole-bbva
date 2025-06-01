import { TestBed } from '@angular/core/testing';
import { ScoreService, ScoreEntry } from './score.service';
import { Difficulty } from './game-config';

describe('ScoreService', () => {
  let service: ScoreService;

  const mockScores: ScoreEntry[] = [
    { name: 'Alice', score: 100, difficulty: 'easy', date: '2024-01-01T00:00:00Z' },
    { name: 'Bob', score: 200, difficulty: 'medium', date: '2024-01-02T00:00:00Z' }
  ];

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load scores from localStorage on init', () => {
  localStorage.setItem('wam-scores', JSON.stringify(mockScores));

  TestBed.resetTestingModule(); // Reinicia el módulo para forzar nueva instancia
  TestBed.configureTestingModule({});
  const newService = TestBed.inject(ScoreService);

  const scores = newService.scores();
  expect(scores.length).toBe(2);
  expect(scores[0].name).toBe('Alice');
});


  it('should add a new score and sort descending', () => {
    const newEntry: ScoreEntry = {
      name: 'Charlie',
      score: 300,
      difficulty: 'hard',
      date: new Date().toISOString()
    };

    service.add(mockScores[0]);
    service.add(mockScores[1]);
    service.add(newEntry);

    const scores = service.scores();
    expect(scores.length).toBe(3);
    expect(scores[0].name).toBe('Charlie'); // Highest score first
    expect(localStorage.getItem('wam-scores')).toContain('Charlie');
  });

  it('should keep only top 20 scores', () => {
    for (let i = 0; i < 25; i++) {
      service.add({
        name: `Player${i}`,
        score: 100 - i,
        difficulty: 'easy' as Difficulty,
        date: new Date().toISOString()
      });
    }
    expect(service.scores().length).toBe(20);
  });

  it('should clear all scores', () => {
    service.add(mockScores[0]);
    service.clear();
    expect(service.scores().length).toBe(0);
    expect(localStorage.getItem('wam-scores')).toBeNull();
  });
});
