import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeCorpoReqDialogComponent } from './de-corpo-req-dialog.component';

describe('DeCorpoReqDialogComponent', () => {
  let component: DeCorpoReqDialogComponent;
  let fixture: ComponentFixture<DeCorpoReqDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeCorpoReqDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeCorpoReqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
