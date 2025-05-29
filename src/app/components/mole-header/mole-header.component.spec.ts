import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleHeaderComponent } from './mole-header.component';

describe('MoleHeaderComponent', () => {
  let component: MoleHeaderComponent;
  let fixture: ComponentFixture<MoleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
