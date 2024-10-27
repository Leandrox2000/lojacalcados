import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheSolicitacaoComponent } from './detalhe-solicitacao.component';

describe('DetalheSolicitacaoComponent', () => {
  let component: DetalheSolicitacaoComponent;
  let fixture: ComponentFixture<DetalheSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheSolicitacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
