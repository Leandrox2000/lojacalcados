import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeraMassa9Component } from './gera-massa9.component';

describe('GeraMassa9Component', () => {
  let component: GeraMassa9Component;
  let fixture: ComponentFixture<GeraMassa9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeraMassa9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeraMassa9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
