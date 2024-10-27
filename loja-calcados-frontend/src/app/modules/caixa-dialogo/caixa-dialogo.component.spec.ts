import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaDialogoComponent } from './caixa-dialogo.component';

describe('CaixaDialogoComponent', () => {
  let component: CaixaDialogoComponent;
  let fixture: ComponentFixture<CaixaDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaixaDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
