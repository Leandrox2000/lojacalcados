import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeCorpoRespostaDialogComponent } from './de-corpo-resposta-dialog.component';

describe('DeCorpoRespostaDialogComponent', () => {
  let component: DeCorpoRespostaDialogComponent;
  let fixture: ComponentFixture<DeCorpoRespostaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeCorpoRespostaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeCorpoRespostaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
