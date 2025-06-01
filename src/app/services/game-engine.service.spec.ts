/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { GameEngineService } from './game-engine.service';
import { GAME_CONFIG } from './game-config';
import { fakeAsync, tick } from '@angular/core/testing';

describe('GameEngineService', () => {
  let service: GameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start the game and set running to true', fakeAsync(() => {
    service.start('easy');
    expect(service.running()).toBeTrue();
    tick(GAME_CONFIG['easy'].interval);
    expect(service.moleIndex()).not.toBeNull();
    service.stop(); // cleanup
  }));

  it('should stop the game and reset state', () => {
    service.start('easy');
    service.stop();
    expect(service.running()).toBeFalse();
    expect(service.moleIndex()).toBeNull();
  });

  it('should return points if hit is correct', () => {
    service.start('easy');
    const index = 2;
    (service as any)._moleIndex.set(index); // simulate mole position
    const points = service.hit(index);
    expect(points).toBe(GAME_CONFIG['easy'].points);
    expect(service.moleIndex()).toBeNull(); // mole disappears after hit
    service.stop();
  });

  it('should return 0 if hit is incorrect', () => {
    service.start('easy');
    (service as any)._moleIndex.set(1);
    const points = service.hit(0);
    expect(points).toBe(0);
    service.stop();
  });

  it('should pick a different random index than previous', () => {
    const exclude = 4;
    const result = (service as any).pickRandomIndex(exclude);
    expect(result).not.toBe(exclude);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(9); // CELLS_COUNT assumed to be 9
  });

  it('should pick any index if exclude is invalid', () => {
    const result = (service as any).pickRandomIndex(undefined);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(9);
  });

  it('should return a different index than exclude when exclude is valid', () => {
  const exclude = 4;
  const iterations = 100;
  const results = new Set<number>();

  for (let i = 0; i < iterations; i++) {
    const result = (service as any).pickRandomIndex(exclude);
    expect(result).not.toBe(exclude);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(9); // CELLS_COUNT = 9
    results.add(result);
  }

  // Asegura que se están generando múltiples valores distintos
  expect(results.size).toBeGreaterThan(1);
});

});
