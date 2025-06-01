import { TestBed } from '@angular/core/testing';
import { LanguageService, LanguageOption } from './language.service';
import { TranslateService } from '@ngx-translate/core';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslateService', ['use', 'getBrowserLang']);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: spy }
      ]
    });

    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    localStorage.clear(); // Limpia el almacenamiento antes de cada test
  });

  it('should be created', () => {
    service = TestBed.inject(LanguageService);
    expect(service).toBeTruthy();
  });

  it('should initialize with saved language from localStorage', () => {
    localStorage.setItem('wam-lang', 'ca');
    translateServiceSpy.getBrowserLang.and.returnValue('en');
    service = TestBed.inject(LanguageService);
    expect(service.current()).toBe('ca');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('ca');
  });

  it('should initialize with browser language if no saved language', () => {
    translateServiceSpy.getBrowserLang.and.returnValue('gl');
    service = TestBed.inject(LanguageService);
    expect(service.current()).toBe('gl');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('gl');
  });

  it('should default to "es" if browser language is unsupported', () => {
    translateServiceSpy.getBrowserLang.and.returnValue('fr');
    service = TestBed.inject(LanguageService);
    expect(service.current()).toBe('es');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('es');
  });

  it('should change language and persist it', () => {
    translateServiceSpy.getBrowserLang.and.returnValue('es');
    service = TestBed.inject(LanguageService);

    service.setLang('eu');
    expect(service.current()).toBe('eu');
    expect(localStorage.getItem('wam-lang')).toBe('eu');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('eu');
  });

  it('should expose all available language options', () => {
    service = TestBed.inject(LanguageService);
    const expectedCodes: LanguageOption['code'][] = ['es', 'en', 'ca', 'gl', 'eu'];
    const actualCodes = service.options.map(opt => opt.code);
    expect(actualCodes).toEqual(expectedCodes);
  });
});
