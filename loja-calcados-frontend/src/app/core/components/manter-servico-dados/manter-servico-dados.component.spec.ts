import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterServicoDadosComponent } from './manter-servico-dados.component';

describe('ManterServicoDadosComponent', () => {
  let component: ManterServicoDadosComponent;
  let fixture: ComponentFixture<ManterServicoDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManterServicoDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterServicoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
