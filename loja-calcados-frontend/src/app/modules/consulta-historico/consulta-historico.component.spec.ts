import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaHistoricoComponent } from './consulta-historico.component';

describe('ConsultaHistoricoComponent', () => {
  let component: ConsultaHistoricoComponent;
  let fixture: ComponentFixture<ConsultaHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
