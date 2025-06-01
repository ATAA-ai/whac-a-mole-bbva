import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoleHeaderComponent } from './mole-header.component';
import { User } from '../../models/user';
import { TranslateModule } from '@ngx-translate/core';

describe('MoleHeaderComponent', () => {
  let component: MoleHeaderComponent;
  let fixture: ComponentFixture<MoleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoleHeaderComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleHeaderComponent);
    component = fixture.componentInstance;
    // Asignamos valores mínimos necesarios para los inputs:
    component.user = { name: 'Usuario de prueba' } as User;
    component.running = false;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Getters playIcon and playAlt', () => {
    it('should return "assets/icons/play.png" and "play" when running is false', () => {
      component.running = false;
      fixture.detectChanges();
      expect(component.playIcon).toBe('assets/icons/play.png');
      expect(component.playAlt).toBe('play');
    });

    it('should return "assets/icons/pause.png" and "pause" when running is true', () => {
      component.running = true;
      fixture.detectChanges();
      expect(component.playIcon).toBe('assets/icons/pause.png');
      expect(component.playAlt).toBe('pause');
    });
  });

  it('onToggle() should emit the playToggle event', () => {
    spyOn(component.playToggle, 'emit');
    component.onToggle();
    expect(component.playToggle.emit).toHaveBeenCalled();
  });

  it('onBackHome() should emit the backHome event', () => {
    spyOn(component.backHome, 'emit');
    component.onBackHome();
    expect(component.backHome.emit).toHaveBeenCalled();
  });
});
