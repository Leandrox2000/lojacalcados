import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLogComponent } from './listar-log.component';

describe('ListarLogComponent', () => {
  let component: ListarLogComponent;
  let fixture: ComponentFixture<ListarLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
