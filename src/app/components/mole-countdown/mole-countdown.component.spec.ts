import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoleCountdownComponent } from './mole-countdown.component';

describe('MoleCountdownComponent', () => {
  let component: MoleCountdownComponent;
  let fixture: ComponentFixture<MoleCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleCountdownComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleCountdownComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should count down and emit "finished" when done', fakeAsync(() => {
    let finishedEmitted = false;
    component.finished.subscribe(() => (finishedEmitted = true));
    // Por defecto, start = 3. Los timeouts se programan:
    // i = 3 --> delay 0ms: count = 3
    // i = 2 --> delay 1000ms: count = 2
    // i = 1 --> delay 2000ms: count = 1
    // i = 0 --> delay 3000ms: count = null y se emite finished
    fixture.detectChanges();

    tick(0); // Ejecuta el timeout inmediato
    expect(component.count()).toBe(3);

    tick(1000);
    expect(component.count()).toBe(2);

    tick(1000);
    expect(component.count()).toBe(1);

    tick(1000);
    expect(component.count()).toBe(null);
    expect(finishedEmitted).toBeTrue();
  }));

  it('should finish and emit "finished" immediately if start is 0', fakeAsync(() => {
    component.start = 0;
    let finishedEmitted = false;
    component.finished.subscribe(() => (finishedEmitted = true));
    fixture.detectChanges();

    tick(0);
    expect(component.count()).toBe(null);
    expect(finishedEmitted).toBeTrue();
  }));

  it('should cancel pending timeouts in ngOnDestroy', fakeAsync(() => {
    fixture.detectChanges();
    tick(0);
    expect(component.count()).toBe(3);

    tick(1000);
    expect(component.count()).toBe(2);

    // Simulamos la destrucción del componente antes de que se completen todos los timeouts
    component.ngOnDestroy();

    tick(2000);
    expect(component.count()).toBe(2);
  }));

  it('should not schedule timeouts if start is negative', fakeAsync(() => {
    component.start = -1;
    let finishedEmitted = false;
    component.finished.subscribe(() => (finishedEmitted = true));
    fixture.detectChanges();

    tick(5000);
    
    expect(component.count()).toBe(null);
    expect(finishedEmitted).toBeFalse();
  }));
});
