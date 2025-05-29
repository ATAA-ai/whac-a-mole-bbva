// src/app/services/language.service.ts
import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface LanguageOption {
  code: 'es' | 'en' | 'ca' | 'gl' | 'eu';
  labelKey: string;
}

const STORAGE_KEY = 'wam-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  /** Available languages with their flag and translation key */
  readonly options: readonly LanguageOption[] = [
    { code: 'es', labelKey: 'lang_es' },
    { code: 'en', labelKey: 'lang_en' },
    { code: 'ca', labelKey: 'lang_ca' },
    { code: 'gl', labelKey: 'lang_gl' },
    { code: 'eu', labelKey: 'lang_eu' }
  ];

  /** Reactive current language */
  private _current = signal<string>(this.initLang());
  readonly current = this._current.asReadonly();

  constructor(private translate: TranslateService) {}

  /** Reads saved lang or browser default */
  private initLang(): string {
    const saved = localStorage.getItem(STORAGE_KEY);
    const browser = this.translate.getBrowserLang() ?? 'es';
    const chosen = saved ?? (['es','en','ca','gl','eu'].includes(browser) ? browser : 'es');
    this.translate.use(chosen);
    return chosen;
  }

  /**
   * Switch to a new language, persist and notify TranslateService.
   * @param code One of 'es'|'en'|'ca'|'gl'|'eu'
   */
  setLang(code: LanguageOption['code']): void {
    this.translate.use(code);
    localStorage.setItem(STORAGE_KEY, code);
    this._current.set(code);
  }
}
