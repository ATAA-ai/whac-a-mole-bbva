import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user';

describe('UserService', () => {
  let service: UserService;

  const mockUser: User = {
    name: 'TestUser',
    score: 50,
    difficulty: 'medium'
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a new user and store it', () => {
    service.setUser('TestUser', 'medium');
    const user = service.user();
    expect(user).toEqual({ name: 'TestUser', score: 0, difficulty: 'medium' });
    expect(localStorage.getItem('wam-user')).toContain('TestUser');
  });

  it('should update score if user exists', () => {
    service.setUser('TestUser', 'easy');
    service.updateScore(25);
    const user = service.user();
    expect(user?.score).toBe(25);
    expect(localStorage.getItem('wam-user')).toContain('"score":25');
  });

  it('should not update score if no user is set', () => {
    service.reset();
    service.updateScore(10);
    expect(service.user()).toBeNull();
  });

  it('should reset user and clear localStorage', () => {
    service.setUser('TestUser', 'hard');
    service.reset();
    expect(service.user()).toBeNull();
    expect(localStorage.getItem('wam-user')).toBeNull();
  });

  it('should load user from localStorage on init', () => {
    localStorage.setItem('wam-user', JSON.stringify(mockUser));
    const newService = new UserService();
    expect(newService.user()).toEqual(mockUser);
  });
});
