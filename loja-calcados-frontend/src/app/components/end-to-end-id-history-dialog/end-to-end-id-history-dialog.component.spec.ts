import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndToEndIdHistoryDialogComponent } from './end-to-end-id-history-dialog.component';

describe('EndToEndIdHistoryDialogComponent', () => {
  let component: EndToEndIdHistoryDialogComponent;
  let fixture: ComponentFixture<EndToEndIdHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndToEndIdHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndToEndIdHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
