import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeraMassaComponent } from './gera-massa.component';

describe('GeraMassaComponent', () => {
  let component: GeraMassaComponent;
  let fixture: ComponentFixture<GeraMassaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeraMassaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeraMassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
