import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicosDadosComponent } from './lista-servicos-dados.component';

describe('ListaServicosDadosComponent', () => {
  let component: ListaServicosDadosComponent;
  let fixture: ComponentFixture<ListaServicosDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaServicosDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaServicosDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
