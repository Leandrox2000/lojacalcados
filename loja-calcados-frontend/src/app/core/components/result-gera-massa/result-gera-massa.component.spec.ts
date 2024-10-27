import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultGeraMassaComponent } from './result-gera-massa.component';

describe('ResultGeraMassaComponent', () => {
  let component: ResultGeraMassaComponent;
  let fixture: ComponentFixture<ResultGeraMassaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultGeraMassaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultGeraMassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
