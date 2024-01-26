import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleateModelComponent } from './deleate-model.component';

describe('DeleateModelComponent', () => {
  let component: DeleateModelComponent;
  let fixture: ComponentFixture<DeleateModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleateModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
