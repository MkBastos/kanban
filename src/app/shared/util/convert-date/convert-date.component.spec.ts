import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertDateComponent } from './convert-date.component';

describe('ConvertDateComponent', () => {
  let component: ConvertDateComponent;
  let fixture: ComponentFixture<ConvertDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
