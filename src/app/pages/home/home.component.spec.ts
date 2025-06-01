import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LanguageService } from '../../services/language.service';
import { NgForm } from '@angular/forms';
import { DIFFICULTY_LIST } from '../../services/game-config';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let userService: UserService;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser componente standalone, lo importamos de forma directa.
      imports: [
        HomeComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        },
        {
          provide: UserService,
          useValue: { setUser: jasmine.createSpy('setUser') }
        },
        {
          provide: LanguageService,
          useValue: {
            // Opciones que usa el componente.
            options: ['en', 'es'],
            // Definimos el método setLang.
            setLang: jasmine.createSpy('setLang'),
            // **Importante:** Definimos current para que no rompa el template.
            current: jasmine.createSpy('current').and.returnValue('en'),
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have "easy" as default selected difficulty', () => {
    expect(component.selectedDifficulty).toBe('easy');
  });

  it('should have difficulties equal to DIFFICULTY_LIST', () => {
    expect(component.difficulties).toEqual(DIFFICULTY_LIST);
  });

  it('should assign langOptions from languageService.options', () => {
    expect(component.langOptions).toEqual(languageService.options);
  });

  it('goScores() should navigate to "/scores"', () => {
    component.goScores();
    expect(router.navigate).toHaveBeenCalledWith(['/scores']);
  });

  it('setLang() should call languageService.setLang with the provided code', () => {
    const code = 'en';
    component.setLang(code);
    expect(languageService.setLang).toHaveBeenCalledWith(code);
  });

  it('onSubmit() should call userService.setUser and navigate to "/game"', () => {
    // Creamos un objeto NgForm simulado.
    const fakeForm = { value: { name: 'Juan Pérez' } } as NgForm;
    // Modificamos la dificultad seleccionada para comprobar que se pasa correctamente.
    component.selectedDifficulty = 'hard';
    component.onSubmit(fakeForm);
    expect(userService.setUser).toHaveBeenCalledWith('Juan Pérez', 'hard');
    expect(router.navigate).toHaveBeenCalledWith(['/game']);
  });
});
